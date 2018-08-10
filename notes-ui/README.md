# notes-ui angularjs web application

The application provides a simple  CRUD UI for very basic note objects.

## Contents

- [Overview](#overview)
- [Setup](#Setup) 
- [Building](#Building)
- [Running](#Running)


## Overview

A simple CRUD UI written in Javascript ES6 with the [Angularjs framework](https://angularjs.org).  Uses Bootstrap 4, angular-ui-bootstrap and angular-ui-router. Also uses Webpack to transpile (babel), uglify, minify and package the project. 

## Setup

Requirements for running the application:

- Node.js >= 7.6
- NPM 

## Configuration

These values are included at the top of the http-request-service.js file.  

```
const API_PORT = 3200;
const API_ENDPOINT = 'api';
```

## Building

```
cd notes-ui
npm i
npm run build
```

## Running for development

```
cd notes-ui
npm start
```
