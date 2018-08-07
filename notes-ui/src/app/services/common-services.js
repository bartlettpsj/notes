console.log('registering common services');

import httpRequestService from './http-request-service';

const commonServicesModule = angular.module('app.common-services', [])
  .service({
    httpRequestService,
  })
  .name;

export default commonServicesModule;
