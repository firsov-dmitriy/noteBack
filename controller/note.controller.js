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
      const { field, search, type, limit, page } = req.query;
      let count;
      let notes;
      if (search) {
        notes = await sortNotes.sortEntry(db, field, search);
      } else if (type) {
        notes = (await sortNotes.sort(db, field, type)).rows;
        count = (await sortNotes.sort(db, field, type)).rowCount;
      } else {
        count = await db.query(`SELECT * FROM note_db`);

        notes = (
          await db.query(
            `SELECT * FROM note_db LIMIT $1 ${
              page >= 1 ? "OFFSET " + (page - 1) * limit : ""
            }`,
            [limit]
          )
        ).rows;
      }

      res.json({ countPage: Math.floor(count / limit), notes });
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
