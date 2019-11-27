#!/usr/bin/env bash
killall node #if program errors node is still running so this kills any node process

set -e
echo hello
mkdir -p screenshots
mkdir -p trace
# [ ! -d "node_modules" ] && echo "INSTALLING MODULES" && npm install
node index.js&
node_modules/.bin/jest --runInBand --detectOpenHandles acceptanceTests/*
read -p "Press enter to continue"
kill %1