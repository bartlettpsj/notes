import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap';
import '../style/app.css';
import commonServices from './services/common-services';
import 'angular-ui-router';
import moment from "moment";

import notesController from './notes/notes.js';
import notesTemplate from './notes/notes.html';
import noteController from './note/note.js';
import noteTemplate from './note/note.html';

// Bootstrap the app via app controller

class AppController {
  constructor(httpRequestService, $scope) {
    'ngInject';

    this.url = 'http://www.infoqss.com';
    this.mytext = 'hello angular!';
    this.$scope = $scope;
    this.httpRequestService = httpRequestService;
  }
}

// Define the angular module with dependencies
const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [commonServices, 'ui.router', 'ui.bootstrap'])

  .controller('AppCtrl', AppController)

  // Define states
  .config(function($stateProvider, $urlRouterProvider) {

    // Home
    $urlRouterProvider.when('', 'notes');

    // The unknown
    $urlRouterProvider.otherwise('/404');

    $stateProvider.state({
      name: '404',
      url: '/404',
      templateUrl: require('./system/404.html')
    });

    $stateProvider.state({
      name: 'notes',
      url: '/notes',
      templateUrl: notesTemplate,
      controller: notesController, // 'NotesController',
      controllerAs: 'vm'
    });

    $stateProvider.state({
      name: 'note',
      url: '/note/{id}',
      templateUrl: noteTemplate,
      controller: noteController,
      controllerAs: 'vm'
    })
  })

  // Define filters
  .filter('dateToNow', () => date => moment(date).fromNow())
  .filter('dateTime', () => date => moment(date).format('LLL'))


  // todo... make this work without webpack-dev-server, need server redirects
  // .config(["$locationProvider", function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  //  }]);

export default MODULE_NAME;
