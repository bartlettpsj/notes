#!/usr/bin/env bash

# Quick and dirty script to build and run hosted by api (koa)
cd notes-ui && npm i && npm run build
cd ../notes-api && npm i && npm start