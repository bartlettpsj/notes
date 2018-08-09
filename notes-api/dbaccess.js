// Start up
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const _ = require('lodash');


class Dbaccess {
  constructor() {
    // Initialize lowdb 'database"
    const adapter = new FileSync('./data/notesdb.json');
    this.db = low(adapter);

    // Set some defaults (required as JSON file starts empty)
    this.db.defaults({ notes: [], maxid: 5}).write();
  }

  /**
   * Perform filter on data
   * @param filter
   */
  async filter(filter) {
    try {
      return this.db.get('notes').filter(filter).value();
    } catch (error) {
      throw `db filter error: ${error} on filter: ${filter}`;
    }
  }

  /**
   * Perform find on data
   * @param filter
   */
  async find(filter) {
    try {
      return this.db.get('notes').find(filter).value();
    } catch (error) {
      throw `db find error: ${error} on filter: ${filter}`;
    }
  }

  /**
   * Performs an upsert on single note.
   * @param note
   * @returns {Promise<void>}
   */
  async upsert(note) {
    try {
      const notes = this.db.get('notes');
      const id = _.get(note, 'id');
      note.modified = new Date();

      const getNextId = () => {
        const maxid = this.db.get('maxid').value();
        this.db.set('maxid', maxid+1).write();
        return maxid+1;
      };

      if (id) {
        // update find
        const foundnote = notes.find({id});
        if (foundnote.value()) {
          foundnote.assign(note).write();
        } else {
          // insert not found
          note.id = getNextId();
          notes.push(note).write();
        }
      } else {
        // insert no id
        note.id = getNextId();
        notes.push(note).write();
      }

    }  catch (error) {
      throw `db update error: ${error}`;
    }
  }

  /**
   * Perform delete of single note by id.
   *
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const notes = this.db.get('notes');
    notes.remove({ id }).write();
  };

}

module.exports = new Dbaccess();

