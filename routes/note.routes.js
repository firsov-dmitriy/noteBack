const Router = require("express");

const router = new Router();
const noteController = require("./controller/note.controller");
router.post("/note", noteController.createNote);
router.get("/note", noteController.getNotes);
router.get("/note/:id", noteController.getOneNote);
router.put("/note", noteController.updateNote);
router.delete("/note/:id", noteController.deleteNote);

module.exports = router;
