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
    const note = await noteService.getOneNote(req.params.id);
    res.json(note.rows[0]);
  }
  async updateNote(req, res) {
    const note = await noteService.updateNote(req.body);
    res.json(note);
  }
  async deleteNote(req, res) {
    const text = await noteService.deleteNote(req.params.id);
    res.json(text);
  }
}
module.exports = new NoteController();
