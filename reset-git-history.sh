#!/bin/sh
# Reset git history, keeping only the current state

git checkout --orphan latest_branch

git add -A

git commit -am "Reset history: keep only current state"

git branch -D main

git branch -m main

git push -f origin main 