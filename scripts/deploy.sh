#!/usr/bin/env bash
# Build the nigsc_homepage2 image inside the production cluster node and
# update the running Deployment.
#
# Run this on a007 (the k0s cluster node), where the in-cluster registry
# 10.96.0.100:5000 is reachable. Requires sudo (for docker and k0s kubectl).
#
# Usage:
#   bash scripts/deploy.sh
#
# Tag format follows the project Coding Standard:
#   nigsc-homepage:<MAJOR.MINOR.PATCH>-<YYMMDDHHmm>
set -euo pipefail

REGISTRY="10.96.0.100:5000"
IMAGE_NAME="nigsc-homepage"
NAMESPACE="nigsc-homepage"
DEPLOYMENT="nigsc-homepage"
HTML_SAURUS_URL="https://github.com/scivicslab/html-saurus/releases/latest/download/html-saurus.jar"

cd "$(dirname "$0")/.."

VERSION="$(node -p "require('./package.json').version")"
TAG="${VERSION}-$(date -u +%y%m%d%H%M)"
DEST="${REGISTRY}/${IMAGE_NAME}:${TAG}"

echo "[1/3] Fetching html-saurus.jar"
curl -fL -o html-saurus.jar "$HTML_SAURUS_URL"

echo "[2/3] Building and pushing image: ${DEST}"
sudo docker run --rm \
  -v "$PWD":/workspace \
  gcr.io/kaniko-project/executor:latest \
  --context=/workspace \
  --dockerfile=/workspace/Dockerfile \
  --destination="${DEST}" \
  --insecure

echo "[3/3] Updating Deployment ${NAMESPACE}/${DEPLOYMENT} to image ${DEST}"
sudo k0s kubectl set image \
  "deployment/${DEPLOYMENT}" \
  "${IMAGE_NAME}=${DEST}" \
  -n "${NAMESPACE}"

echo
echo "Image tag: ${TAG}"
echo "Wait for rollout:"
echo "  sudo k0s kubectl rollout status deployment/${DEPLOYMENT} -n ${NAMESPACE}"
