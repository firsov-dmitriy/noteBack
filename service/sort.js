class SortNotes {
  // sort ASC or DESC on the parameter type
  async sort(db, field, type) {
    if (type == 1) {
      const data = (await db.query(`SELECT * FROM note ORDER BY ${field} ASC`))
        .rows;
      return data;
    } else if (type == -1) {
      const data = (await db.query(`SELECT * FROM note ORDER BY ${field} DESC`))
        .rows;
      return data;
    }
  }
  // sort to entry or equals parametr search
  async sortEntry(db, field, search) {
    const data = (await db.query(`SELECT * FROM note  ${field}`)).rows;
    let sortArr = [];
    let otherArr = [];
    for (const i of data) {
      if (i.name.toLowerCase().includes(search.toLowerCase())) {
        sortArr.push(i);
      } else {
        otherArr.push(i);
      }
    }

    return [...sortArr, ...otherArr];
  }
}

const sortNotes = new SortNotes();
module.exports = sortNotes;
