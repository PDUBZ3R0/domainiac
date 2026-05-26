#!/bin/bash

git add *
git commit -m "Automated Builder: New ISO Data"
git push
npm publish