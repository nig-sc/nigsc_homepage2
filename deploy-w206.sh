#!/bin/bash
# Build this site into a container image and run it on the W206 test cluster.
#
# The test cluster is the W location of HomepageDeploy_260426_oo01: namespace nigsc-homepage on
# the W206 k0s cluster, reached on NodePort 31086. The production cluster (P, reached from a007)
# is not touched here; GitHub Actions deploys there on a push to master.
#
# Three machines take part, because no single one can do all of it:
#   - this machine runs kubectl against the W206 cluster and holds the git working copy
#   - 192.168.5.14 has the docker daemon, with 192.168.5.13:32000 configured as insecure
#   - 192.168.5.13:32000 is the W206 registry the cluster pulls from
#
# Usage:
#   ./deploy-w206.sh                      # the html-saurus release the production CI pins
#   ./deploy-w206.sh ~/works/html-saurus.jar   # a jar of your own, to test a html-saurus change
set -euo pipefail

HTML_SAURUS_RELEASE=v2.2.0
HTML_SAURUS_JAR_URL=https://github.com/scivicslab/html-saurus/releases/download/${HTML_SAURUS_RELEASE}/html-saurus-${HTML_SAURUS_RELEASE#v}.jar
BUILD_HOST=devteam@192.168.5.14
BUILD_DIR=/home/devteam/works/nigsc_homepage2-w206-build
REGISTRY=192.168.5.13:32000
NAMESPACE=nigsc-homepage
DEPLOYMENT=nigsc-homepage
NODE_PORT_URL=http://192.168.5.21:31086

repo=$(cd "$(dirname "$0")" && pwd)
version=$(python3 -c "import json; print(json.load(open('$repo/package.json'))['version'])")
tag="nigsc-homepage:${version}-$(date -u +%y%m%d%H%M)"

# The jar goes into the image by name, so put the chosen one where the Dockerfile expects it.
if [ $# -ge 1 ]; then
  echo "== using the jar given on the command line: $1"
  cp "$1" "$repo/html-saurus.jar"
else
  echo "== downloading the html-saurus release the production CI pins (${HTML_SAURUS_RELEASE})"
  curl -fL -o "$repo/html-saurus.jar" "$HTML_SAURUS_JAR_URL"
fi

# sudo on the build host reads its password from standard input, which rsync and docker also use,
# so it is read once into a file the operator's own account can read and passed per command.
pwfile=$(mktemp); chmod 600 "$pwfile"
trap 'rm -f "$pwfile"' EXIT
kubectl exec -n infra-vault vault-0 -- \
  env VAULT_TOKEN="$(cat ~/.vault-token)" \
  vault kv get -field=password devtools/sudo/devteam > "$pwfile"

echo "== copying the build context to $BUILD_HOST:$BUILD_DIR"
# The same exclusions .dockerignore states, applied here so they never cross the network.
rsync -a --delete \
  --exclude node_modules --exclude build --exclude static-html --exclude search-index \
  --exclude search-embedding --exclude .docusaurus --exclude .git \
  "$repo/" "$BUILD_HOST:$BUILD_DIR/"

echo "== building $REGISTRY/$tag on $BUILD_HOST"
ssh "$BUILD_HOST" "cd $BUILD_DIR && printf '%s\n' \"\$(cat)\" | sudo -S -p '' docker build -t $REGISTRY/$tag ." < "$pwfile"

echo "== pushing to $REGISTRY"
ssh "$BUILD_HOST" "printf '%s\n' \"\$(cat)\" | sudo -S -p '' docker push $REGISTRY/$tag" < "$pwfile"

echo "== pointing the W206 deployment at the new image"
# The container's name is read from the deployment rather than assumed: it is nginx here, while
# the production deployment names its container after the product, and naming the wrong one makes
# kubectl answer "unable to find container" after the image has already been built and pushed.
container=$(kubectl get deploy "$DEPLOYMENT" -n "$NAMESPACE" \
  -o jsonpath='{.spec.template.spec.containers[0].name}')
kubectl set image "deployment/$DEPLOYMENT" "$container=$REGISTRY/$tag" -n "$NAMESPACE"
kubectl rollout status "deployment/$DEPLOYMENT" -n "$NAMESPACE" --timeout=300s

echo "== the running image is now"
kubectl get deploy "$DEPLOYMENT" -n "$NAMESPACE" -o jsonpath='{.spec.template.spec.containers[*].image}{"\n"}'
echo "== the site answers at $NODE_PORT_URL"
curl -s -o /dev/null -w "front page: %{http_code}\n" "$NODE_PORT_URL/"
