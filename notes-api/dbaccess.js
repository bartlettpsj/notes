// Start up
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const _ = require('lodash');

const DB_LOCATION = './data/notesdb.json';

/**
 * Singleton for database access to lowdb
 */
class Dbaccess {
  constructor() {
    // Initialize lowdb 'database"
    const adapter = new FileSync(DB_LOCATION);
    this.db = low(adapter);

    // Set initial database
    this.db.defaults({ notes: [], maxid: 0}).write();
  }

  /**
   * Perform initialize of database.
   *
   * @returns {Promise<void>}
   */
  async init(id) {
    this.db.set('maxid', 0).write();
    this.db.get('notes').remove({}).write();
  };

  /**
   * Perform filter on data.
   * returns { count: x, data: [] }
   *
   * @param filter
   */
  async filter(params) {
    try {
      const limit = parseInt(_.get(params, 'limit'));
      const skip = parseInt(_.get(params, 'skip'));
      
      const notes = this.db.get('notes');
      const count = notes.size().value();
      const dropped = notes.drop(skip);
      const output = limit ? dropped.take(limit) : dropped;
      return { count, data: output.value() };
      
    } catch (error) {
      throw `db filter error: ${error} on filter: ${filter}`;
    }
  }

  /**
   * Perform find on data.
   *
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
   * Performs an upsert on a single note.
   *
   * @param note
   * @returns {Promise<void>}
   */
  async upsert(note) {
    try {
      const notes = this.db.get('notes');
      const id = _.get(note, 'id');
      note.modified = new Date();

      const getNextId = () => {
        const maxid = this.db.get('maxid').value() + 1;
        this.db.set('maxid', maxid).write();
        return maxid;
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

