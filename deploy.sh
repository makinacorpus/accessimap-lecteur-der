#!/bin/bash

# Enable error reporting to the console.
set -e

# Make sure we have the updated .travis.yml file so tests won't run on master.

echo $COMMIT_AUTHOR_EMAIL

export COMMITTER_EMAIL="$(git log -1 $TRAVIS_COMMIT --pretty="%cE")"
export AUTHOR_NAME="$(git log -1 $TRAVIS_COMMIT --pretty="%aN")"

echo $COMMITTER_EMAIL
echo $AUTHOR_NAME

# Config git
git config --global user.email "$COMMITTER_EMAIL"
git config --global user.name "Travis CI"
git config -l

# Build the der reader
cd modules/der-reader
yarn install
npm run build

# Deploy to github page
cd dist
ls
git status
git init
git add -A .
git status
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER / ${SHA}"
git status
git push --force --quiet "https://${GITHUB_API_TOKEN}@github.com/makinacorpus/accessimap-lecteur-der.git" master:gh-pages > /dev/null 2>&1

# Build electron
cd ../../../electron
yarn install
npm run build
ls $TRAVIS_BUILD_DIR/electron/dist/accessimap*

# Say to opbeat there is a new release
curl https://intake.opbeat.com/api/v1/organizations/48eaafd23a8a462184cf7903765ea4a3/apps/b73624b852/releases/ \
-H "Authorization: Bearer b328f11ea37c11ae7cc37fdbfaae992eb3a928b6" \
-d rev=`git log -n 1 --pretty=format:%H` \
-d branch=`git rev-parse --abbrev-ref HEAD` \
-d status=completed
