# Notes Application

A small system for managing notes.

## Contents

- [Overview](#overview)
- [Setup](#Setup) 
- [Building](#Building)
- [Running](#Running)


## Overview


Comprises two projects -  api and ui

api based on koa (express successor)

ui based on angularjs

API can be scaled.

UI can be served by api server or separate server.  Typically UIs are served by servers such as Apache, tomcat or nginx.  API's are served by a separate scaleable server (farm) and protected with authentication by ACLs.

can be run separately.  Does include cors but coded to run on the same machine.  Would be easy to make UI configurable.