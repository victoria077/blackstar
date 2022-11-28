const Router = require("express");
const router = new Router();
const controller = require("./notesController");

router.post("/save", controller.saveNote);
router.put("/edit", controller.editNote);
router.delete("/delete/:id", controller.deleteNote);
router.get("/notes", controller.getNotes);

module.exports = router;