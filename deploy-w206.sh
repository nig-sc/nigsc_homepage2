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
#   LINK_CHECK=only ./deploy-w206.sh      # only look for broken same-site links; deploy nothing
#   LINK_CHECK=skip ./deploy-w206.sh      # deploy without that look
set -euo pipefail

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
  # Read the URL out of the production workflow rather than repeat it here: the point of this
  # script is to rehearse what production will do, and a second copy of the version drifts from it.
  url=$(sed -n 's|.*\(https://github.com/scivicslab/html-saurus/releases/download/[^ ]*\.jar\).*|\1|p' \
        "$repo/.github/workflows/build-and-push.yml" | head -1)
  if [ -z "$url" ]; then
    echo "could not read the html-saurus release URL from .github/workflows/build-and-push.yml" >&2
    exit 1
  fi
  echo "== downloading the html-saurus release the production CI pins: $url"
  curl -fL -o "$repo/html-saurus.jar" "$url"
fi

# Look for broken same-site links in the pages, before anything is built or pushed. The check is
# made here, in the rehearsal, and not inside the image: a container that stops at start-up
# because of a broken link would leave the old pod running under a CI run that reports success,
# while a failure here stops the rehearsal and prints the links. Production serves what this
# step has let through.
#   LINK_CHECK=skip       do not check
#   LINK_CHECK=only       check and stop, without deploying
#   BUILD_ONLY_JAR=path   the html-saurus-build-only jar to check with
link_check() {
  local jar work
  jar="${BUILD_ONLY_JAR:-}"
  work=$(mktemp -d)
  if [ -z "$jar" ]; then
    # The jar of the same release as the one served: the name differs in one word.
    if [ $# -ge 1 ] && [ -n "$1" ]; then
      jar="${1/html-saurus-production-server-/html-saurus-build-only-}"
    fi
    if [ -n "${url:-}" ]; then
      jar="$work/html-saurus-build-only.jar"
      echo "== downloading the build-only jar of the same release"
      curl -fL -o "$jar" "${url/html-saurus-production-server-/html-saurus-build-only-}"
    fi
  fi
  if [ -z "$jar" ] || [ ! -f "$jar" ]; then
    echo "no html-saurus-build-only jar to check with (looked for: ${jar:-none}); set BUILD_ONLY_JAR=<path> or LINK_CHECK=skip" >&2
    rm -rf "$work"
    exit 1
  fi
  echo "== checking the pages for broken same-site links"
  mkdir "$work/site"
  rsync -a --exclude node_modules --exclude build --exclude static-html --exclude search-index \
    --exclude search-embedding --exclude .docusaurus --exclude .git --exclude Dockerfile \
    --exclude '*.jar' "$repo/" "$work/site/"
  if nice -n 19 java -jar "$jar" html -d "$work/site" --no-diagrams --strict-links > "$work/check.log" 2>&1; then
    echo "   no broken links"
    rm -rf "$work"
  else
    echo "== broken same-site links found; nothing was built or pushed" >&2
    sed -n '/^WARNING: .*broken internal link/,$p' "$work/check.log" >&2
    rm -rf "$work"
    exit 1
  fi
}
case "${LINK_CHECK:-}" in
  skip) echo "== skipping the link check (LINK_CHECK=skip)" ;;
  only) link_check "$@"; exit 0 ;;
  *)    link_check "$@" ;;
esac

# sudo on the build host reads its password from standard input, which rsync and docker also use,
# so it is read once into a file the operator's own account can read and passed per command.
pwfile=$(mktemp); chmod 600 "$pwfile"
trap 'rm -f "$pwfile"' EXIT
~/bin/vault-read devtools/sudo/devteam password > "$pwfile"

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
