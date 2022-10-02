const db = require("../db");

class NoteService {
  async createNote(body) {
    const { name, amount, distance } = body;
    const date = new Date();
    const note = await db.query(
      `INSERT INTO note_db (name, createdate, amount, distance) values ($1, $2, $3, $4) RETURNING * `,
      [name, date, amount, distance]
    );
    return note.rows[0];
  }

  async getNotes(query) {
    const { field, type, search, limit = 5 } = query;
    const data = await db.query(`SELECT * FROM note_db`);
    const notes = data.rows;
    const countNote = data.rowCount;
    const countPage = Math.floor(countNote / limit);

    if (field && search) {
      const sortArr = [];
      const rest = [];
      switch (field) {
        case "amount":
          for (const i of notes) {
            i.amount == search ? sortArr.push(i) : rest.push(i);
          }
          break;
        case "distance":
          for (const i of notes) {
            i.amount == search ? sortArr.push(i) : rest.push(i);
          }

          break;
        case "name":
          for (const i of notes) {
            if (i[field].toLowerCase().includes(search.toLowerCase())) {
              sortArr.push(i);
            } else {
              rest.push(i);
            }
          }
          break;
      }
      return { notes: [...sortArr, ...rest], countNote };
    }
    if (field || (field && type == 1)) {
      return { notes: notes.sort((a, b) => a[field] - b[field]), countNote };
    } else if (field && type == -1) {
      return { notes: notes.sort((a, b) => b[field] - a[field]), countNote };
    }

    return { notes, countNote, countPage };
  }

  async getOneNote(id) {
    const note = await db.query(`SELECT * FROM note_db where id = $1`, [id]);
    return note;
  }
  async updateNote(body) {
    const { id, name, amount, distance } = body;
    const note = await db.query(
      `UPDATE note_db set id = $1, name = $2, amount = $3, distance = $4 RETURNING *`,
      [id, name, amount, distance]
    );
    return note;
  }
}

const sortNotes = new NoteService();
module.exports = sortNotes;
