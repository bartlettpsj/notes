import _ from 'lodash';

import noteController from '../note/note.js';
import noteTemplate from '../note/note.html';

class NotesController {
  constructor($scope, $timeout, $stateParams, httpRequestService, $uibModal) {
    'ngInject';

    this.pagenumber = 2;
    this.httpRequestService = httpRequestService;
    this.$uibModal = $uibModal;
    this.loadNotes();
  }

  loadNotes() {
    this.httpRequestService.getData('notes').then(data => {
      this.notes = data;
      console.log('notes loaded', data);
    });
  }

  showNote(note) {
    const modalInstance = this.$uibModal.open({
     templateUrl: noteTemplate,
     controller: noteController,
     bindToController: true,
     controllerAs: 'vm',
     backdrop: 'static',
     // keyboard: false, // dont allow escape key
     size: 'lg'
    });

    // Wait for completion then refresh
    modalInstance.result.then(result => {
      this.loadNotes();
    });
  }

  checkSelections() {
      this.hasSelected = _.some(this.notes, 'selected');
  }

  deleteSelections() {
    // get checked notes and delete each via promise.all
    const selected = _.map(_.filter(this.notes, 'selected'), note => note.id);
    const promises = _.map(_.filter(this.notes, 'selected'), note => this.httpRequestService.deleteDataById('notes', note.id));
    Promise.all(promises).then(response => {
      this.checkSelections();
      this.loadNotes();
    })
  }
}

export default NotesController;
