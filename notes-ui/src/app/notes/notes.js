import _ from 'lodash';

import noteController from '../note/note.js';
import noteTemplate from '../note/note.html';

console.log('Controller:', noteController);
console.log('Template:', noteTemplate);

class NotesController {
  constructor($scope, $timeout, $stateParams, httpRequestService, $uibModal) {
    'ngInject';

    this.httpRequestService = httpRequestService;
    this.$uibModal = $uibModal;
    this.loadNotes();


    $timeout( () => {  console.log('timeout!'); this.$uibModal.open({template: '<h1>Hello</h1>'}) }, 2000 );
  }

  loadNotes() {
    this.httpRequestService.getData('notes').then(data => {
      this.notes = data;
    });
  }

  showNote(note) {
    this.$uibModal.open({template: '<h1>Hello</h1>'});
    console.log('Showing note:', note);

    //const modalInstance = this.$uibModal.open({
    //  template: '<h1>Hello</h1>'
    //  //templateUrl: noteTemplate,
    //  //controller: noteController, // require('../note/note.js'),//.default,
    //  //bindToController: true,
    //  //controllerAs: 'modal',
    //  //backdrop: 'static',
    //  //keyboard: false, // dont allow escape key
    //  //size: 'lg'
    //  //resolve: { }
    //});
    //
    //console.log('Instance: ', modalInstance);
  }

  checkSelections() {
      this.hasSelected = _.some(this.notes, 'selected');
  }

}

export default NotesController;
