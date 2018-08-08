import _ from 'lodash';

class NoteController {
  constructor($scope, $stateParams, httpRequestService) {
    'ngInject';

    this.httpRequestService = httpRequestService;

    // Save for later in note.js!
    this.id =  $stateParams.id;

  }

}

export default NoteController;
