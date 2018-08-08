import angular from 'angular';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.css';
import commonServices from './services/common-services';

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
    this.mytext = 'hello world!';
    this.$scope = $scope;
    this.httpRequestService = httpRequestService;
  }

  clickme() {
    // Test method to prove connected up
    this.httpRequestService.getDataById('api', 1).then(data => {
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

angular.module(MODULE_NAME, [commonServices])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
