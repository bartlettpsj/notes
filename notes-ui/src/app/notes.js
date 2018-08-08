import _ from 'lodash';

class NotesController {
  constructor($scope, $timeout, $stateParams, httpRequestService) {
    'ngInject';

    this.$timeout = $timeout;
    this.httpRequestService = httpRequestService;

    // Save for later in note.js!
    this.id =  $stateParams.id;

    this.getNotes();
  }

  getNotes() {
    this.httpRequestService.getData('notes').then(data => {
      this.notes = data;
    })
  }

  checkSelections() {
      this.hasSelected = _.some(this.notes, 'selected');
  }

}

export default NotesController;
