import _ from 'lodash';

import noteController from '../note/note.js';
import noteTemplate from '../note/note.html';

/**
 * Handle list of notes.
 */
class NotesController {
  constructor($scope, $timeout, $stateParams, httpRequestService, $uibModal) {
    'ngInject';

    this.httpRequestService = httpRequestService;
    this.$uibModal = $uibModal;

    // Pagination variables
    this.pageNumber = 1;
    this.pageSize = 10;

    this.loadNotes();
  }

  /**
   * Load next page of notes on promise.
   *
   * @returns {*}
   */
  loadNotes() {
    const filter = {
      skip: (this.pageNumber-1) * this.pageSize,
      limit: this.pageSize
    };

    return this.httpRequestService.getData('notes', filter).then( ({count, data}) => {
      this.notes = data;
      this.notesCount = count;
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
     backdrop: 'static'
    });

    const beforeCount = this.notesCount;
    const beforePageNumber = this.pageNumber;

    // Wait for completion then refresh
    modalInstance.result.then(modalResult => {

      if (modalResult == 'ok') {
        this.loadNotes().then(resp => {

          // Go to last page to display new note if not already on it
          const newPageNumber = Math.floor(this.notesCount / this.pageSize) + 1;
          if (newPageNumber != beforePageNumber) {
            this.pageNumber = newPageNumber;
            this.loadNotes();
          }
        })
      }
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

  pageChange() {
    this.loadNotes();
  }
}

export default NotesController;
