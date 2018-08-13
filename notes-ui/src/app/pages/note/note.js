/**
 * Handle display and edit of a single note.  This may be called as modal or as page.
 */
class NoteController {
  constructor($scope, $stateParams, $state, httpRequestService) {
    'ngInject';

    this.httpRequestService = httpRequestService;
    this.$state = $state;
    this.modalInstance = $scope.vm;
    this.note = {};

    // Load note by id if passed
    if ($stateParams.id) {
      this.loadNote($stateParams.id);
    }
  }

  /**
   * Load individual note by id.
   *
   * @param id
   * @returns {*}
   */
  loadNote(id) {
    return this.httpRequestService.getDataById('notes', id).then(data => {
      if (data) {
        this.note = data;
      } else {
        // Note not found or any form of error from server
        this.$state.go('404');
      }

    });
  }

  /**
   * Perform upsert of note then close if via modal.  go to list state.
   */
  saveNote() {
    // Upsert
    this.httpRequestService.putData('notes', this.note).then(response => {
      this.cancelModal('ok');

      // Display list
      this.$state.go('notes');
    })
  }

  /**
   * Close the modal if opened as modal.
   */
  cancelModal(mode) {
    if (this.modalInstance) {
      this.modalInstance.$close(mode);
    }
  }

}

export default NoteController;
