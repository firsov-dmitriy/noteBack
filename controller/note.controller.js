const db = require("../db");
const noteService = require("../service/note.service");

class NoteController {
  async createNote(req, res) {
    const note = await noteService.createNote(req.body);
    res.json(note);
  }
  async getNotes(req, res) {
    const response = await noteService.getNotes(req.query);
    res.json(response);
  }

  async getOneNote(req, res) {
    const note = noteService.getOneNote(req.id);
    res.json(note.rows[0]);
  }
  async updateNote(req, res) {
    const note = noteService.updateNote(req.body);
    res.json(note.rows[0]);
  }
  async deleteNote(req, res) {
    const id = req.params.id;
    const note = await db.query(`DELETE FROM note_db where id = $1`, [id]);
    res.json(note.rows[0]);
  }
}
module.exports = new NoteController();
