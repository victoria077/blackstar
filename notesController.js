const Note = require("./models/Note");

class notesController {
  async getNotes(req, res) {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (e) {}
  }
  
  async saveNote(req, res) {
    try {
      const { text, title, date } = req.body;
      const note = new Note({ title: title, text: text, date: date });
      await note.save();
      res.json("Notification successfully saved");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Save note error" });
    }
  }

  async editNote(req, res) {
    try {
      const { text, title, id } = req.body;
      const note = { title: title, text: text };
      await Note.findOneAndUpdate({ _id: id }, note);
      res.json("Notification successfully edited");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Edit note error" });
    }
  }

  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      console.log(req.params);
      await Note.deleteOne({ _id: id });
      res.json("Notification successfully deleted");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Delete note error" });
    }
  }
}

module.exports = new notesController();
