#!/bin/bash
git add .
echo -n "Enter a comment for this release [ENTER]: "
read comment
git commit -m "Update medfind release apk - $comment"
git push
