const db = require("../../db");
const pagePagination = require("../pagination");

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
    let result = [];
    const { field, type, search, limit, page } = query;
    const data = await db.query(`SELECT * FROM note_db`);
    const notes = data.rows;
    const countNote = data.rowCount;
    let countPage = Math.ceil(notes.length / limit);

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
      result = [...sortArr, ...rest];
    } else if (field && type == -1) {
      result = [...notes.sort((a, b) => b[field] - a[field])];
    } else if (field || (field && type == 1)) {
      result = [...notes.sort((a, b) => a[field] - b[field])];
    } else {
      result = [...notes];
    }

    return {
      notes: limit ? pagePagination(result, limit, page) : result,
      countNote,
      countPage,
    };
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
  async deleteNote(id) {
    const note = await db.query(`DELETE FROM note_db where id = $1`, [id]);
    return `Deleted note for id ${id}`;
  }
}

const sortNotes = new NoteService();
module.exports = sortNotes;
