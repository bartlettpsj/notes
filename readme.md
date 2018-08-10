# Notes Application

A small system for managing notes.

## Contents

- [Overview](#Overview)
- [Development](#Development) 
- [Running](#Running)
- [using](#Using)


## Overview

Comprises two projects -  API and UI.  Both are written in javascript.  Each has a seoarate readme.md file.

- [api readme](notes-api/readme.md)
- [ui readme](notes-ui/readme.md)

### API

The API is Restful JSON and runs on the koa <www.koajs.com> (express successor) framework.  It is a native nodejs application, using es7 (async/await) for added simplicity.  It therefore requires node 7.6 or above.  The API includes cors support. 

### UI

The UI is written using the angularjs 1.x framework.  It is an SPA application.  In uses ES6.  Babel is used to compile down to ES5 so that it will run on older browsers, such as Internet Explorer.  Bootstrap 4 has been used for the presentation.  The UI is transpiled, uglified and minified and packaged by Webpack.

The UI and API can be served by separate servers, but for demo purposes the UI is coded to run on the same machine.

## Development

During development it is recommended to run the UI using the webpack-dev-server.  This provides hot reload and eases debugging with inline-sourcemap.

To start the ui server in development mode, start a terminal window and enter..

```
cd notes-ui     
npm i
npm start
```

To start the ui server in development mode, start a terminal window and enter..

```
cd notes-api
npm i
npm start
```

The UI will run on port 8080.  The UI will run on port 3200.



## Running

A simple convenience script has been produced to build both API and UI, then run the API to serve the frontend.

```
cd notes
./demo.sh
```

Note: you may need to give execution permissions to demo.sh by `chmod +x demo.sh`



## Using

In demo mode go to http://localhost:3200.  In development mode go to http://localhost:8080

The system comprises 2 views and 1 modal (using one of the views).

You are initially presented with a list of notes.  From here you can Create new notes, view existing notes and delete one or more selected notes, 

The format of the URL is:

http://localhost:3200/#!/notes - lists all notes and is the home page / default view.

http://localhost:3200/#!/note/16 - goes to note number 16.



You can also directly access the API using:

http://localhost:3200/api/notes - gets all the notes in JSON.

The full specification of API is [here](#notes-api/doc/api.md)

