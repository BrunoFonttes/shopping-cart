#!/bin/sh

npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && npx cz --hook || true"