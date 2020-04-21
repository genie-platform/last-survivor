#!/bin/sh

cd ../app
yarn build

rm -rf ../backend/public/*
mv build/* ../backend/public
