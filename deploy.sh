#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db

# config
git config --global user.email "travis@nobody.org"
git config --global user.name "Travis CI"

# deploy
cd modules/der-reader/dist
ls
git init
git add .
git commit -m "Deploy to Github Pages"
git status
git push --force --quiet "https://${GITHUB_API_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1