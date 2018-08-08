import angular from 'angular';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/app.css';
import commonServices from './services/common-services';
import 'angular-ui-router';

import notesController from './notes.js';
import notesTemplate from './notes.html';

// Bootstrap directive
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'vm'
  }
};

class AppCtrl {
  constructor(httpRequestService, $scope) {
    'ngInject';

    this.url = 'http://www.infoqss.com';
    this.mytext = 'hello angular!';
    this.$scope = $scope;
    this.httpRequestService = httpRequestService;
  }

  clickme() {
    // Test method to prove connected up
    this.httpRequestService.getDataById('note', 1).then(data => {
      this.mytext = data;
      this.updateApply();
    })
  }

  // Needed due to babel zones problems
  updateApply() {
    if(!this.$scope.$$phase) {
      this.$scope.$apply();
    }
  }

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [commonServices, 'ui.router'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .config(function($stateProvider, $urlRouterProvider) {

    // Home
    $urlRouterProvider.when('', 'notes');

    // the unknown
    $urlRouterProvider.otherwise('/404');

    $stateProvider.state({
      name: '404',
      url: '{path:.*}',
      templateUrl: require('./404.html')
    });

    // $stateProvider.state({
    //   name: 'home',
    //   url: '/',
    //   templateUrl: require('./home.html'),
    //   controller: notesController,
    //   controllerAs: 'vm'
    // });

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
      templateUrl: notesTemplate,
      controller: notesController,
      controllerAs: 'vm'
    });

    // $stateProvider.state({
    //   name: 'hello',
    //   url: '/hello',
    //   template: '<h3>Hello Template World!</h3>'
    // });
    //
    // $stateProvider.state({
    //   name: 'paul',
    //   url: '/paul/{id}',
    //   template: '<h2>Hello Paul Bartlett - id {{id}}!</h2>'
    // });

  })

  // todo... make this work without webpack-dev-server, need server smarts or dummy pages
  // .config(["$locationProvider", function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  //  }]);

export default MODULE_NAME;
