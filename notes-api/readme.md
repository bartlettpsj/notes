# notes-api RESTFul Service

A service that providers CRUD API for Note objects.

## Contents

- [Overview](#overview)
- [API Documentation](#API Documentation) 
- [Setup](#Setup) 
- [Building](#Building)
- [Running](#Running)


## Overview

A simple CRUD API written in nodejs with the [koa framework](https://koajs.com).  This initial version is a single user for demo purposes.  All data is stored in a single unshared json file with the  data directory using lowdb.

This server is able to serve up the notes-ui front end using koa-static.  To access the api use http://localhost:3200/api and to access the website go to http://localhost:3200

## API Documentation

Visit [here](./doc/api.md) for the API documentation.

## Setup

Requirements for running the application:

- Node.js >= 7.6
- NPM 

## Configuration

These values are included at the top of the server.js file.  

```
const API_PORT = 3200;
const API_ENDPOINT = 'api';
```

If these values are used an example API call would be:

```
curl http://localhost:3200/api/notes
```

## Building

```
cd notes-api
npm i
npm run build
```

## Running

```
cd notes-api
npm start
```