import _ from 'lodash';

import noteController from '../note/note.js';
import noteTemplate from '../note/note.html';

/**
 * Handle list of notes.
 */
class NotesController {
  constructor($scope, $timeout, $stateParams, httpRequestService, $uibModal) {
    'ngInject';

    this.pagenumber = 1;
    this.httpRequestService = httpRequestService;
    this.$uibModal = $uibModal;
    this.loadNotes();
  }

  /**
   * Load all notes on promise.
   *
   * @returns {*}
   */
  loadNotes() {
    return this.httpRequestService.getData('notes').then(data => {
      this.notes = data;
    });
  }

  /**
   * Show specified note for view/edit via modal and refresh on close.
   *
   * @param note
   */
  showNote(note) {
    const modalInstance = this.$uibModal.open({
     templateUrl: noteTemplate,
     controller: noteController,
     bindToController: true,
     controllerAs: 'vm',
     backdrop: 'static',
     size: 'lg'
    });

    // Wait for completion then refresh
    modalInstance.result.then(result => {
      this.loadNotes();
    });
  }

  /**
   * Set any item checked flag for UX enable/disable.
   */
  checkSelections() {
      this.hasSelected = _.some(this.notes, 'selected');
  }

  /**
   * Get checked notes and delete each via promise.all then refresh.
   */
  deleteSelections() {
    const promises = _.map(_.filter(this.notes, 'selected'), note => this.httpRequestService.deleteDataById('notes', note.id));

    Promise.all(promises).then(response => {
      this.loadNotes().then(response => {
        this.checkSelections();
      })
    })
  }
}

export default NotesController;
