#!/bin/bash
yarn install
yarn clean
yarn build:$YARN_BUILD_ENV
yarn start:$YARN_START_ENV