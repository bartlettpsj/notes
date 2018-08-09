import _ from 'lodash';
import moment from 'moment';

class NoteController {
  constructor($scope, $stateParams, $state, httpRequestService) { // $uibModalInstance)
    'ngInject';

    this.httpRequestService = httpRequestService;
    this.$state = $state;
    this.note = {};

    // Save for later in note.js!
    const id =  $stateParams.id;

    if(id) {
      this.loadNote(id);
    }

    this.isModal = $scope.vm;
  }

  loadNote(id) {
    this.httpRequestService.getDataById('notes', id).then(data => {
      this.note = data;
    });
  }

  saveNote() {
    // Perform upsert on note then close if via modal.  go to list state.
    this.httpRequestService.putData('notes', this.note).then(response => {
      if (this.isModal) {
        this.isModal.$close('cancel');
      }

      // go to the list
      this.$state.go('notes');
    })
  }

  cancelModal() {
    if (this.isModal) {
      this.isModal.$close('cancel');
    }
  }

}

export default NoteController;
