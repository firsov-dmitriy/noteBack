const db = require("../db");
const sortNotes = require("../service/sort");

class NoteController {
  async createNote(req, res) {
    const { name, amount, distance } = req.body;
    const newData = new Date();
    const newNote = await db.query(
      `INSERT INTO note_db (name, createdate, amount, distance) values ($1, $2, $3, $4) RETURNING * `,
      [name, newData, amount, distance]
    );

    res.json(newNote.rows[0]);
  }
  async getNotes(req, res) {
    try {
      const { field, search, type } = req.query;
      let notes;
      if (search) {
        notes = await sortNotes.sortEntry(db, field, search);
      } else if (type) {
        notes = await sortNotes.sort(db, field, type);
      } else {
        notes = (await db.query(`SELECT * FROM note_db`)).rows;
      }

      res.json(notes);
    } catch (error) {
      console.error(error);
    }
  }
  async getOneNote(req, res) {
    const id = req.params.id;
    const note = await db.query(`SELECT * FROM note_db where id = $1`, [id]);
    res.json(note.rows[0]);
  }
  async updateNote(req, res) {
    const { id, name, amount, distance } = req.body;
    const note = await db.query(
      `UPDATE note_db set id = $1, name = $2, amount = $3, distance = $4 RETURNING *`,
      [id, name, amount, distance]
    );
    res.json(note.rows[0]);
  }
  async deleteNote(req, res) {
    const id = req.params.id;
    const note = await db.query(`DELETE FROM note_db where id = $1`, [id]);
    res.json(note.rows[0]);
  }
}
module.exports = new NoteController();
