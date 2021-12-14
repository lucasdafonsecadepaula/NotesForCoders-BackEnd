const mongoose = require("../server.js");

const Note = mongoose.model("Note", {
  avatar: { type: String, require: true, default: ''},
  title: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: Date,require: true, default: Date.now },
  likes: { type: Number, require: true, default: 0 },
  dislikes: { type: Number, require: true, default: 0 },
});

module.exports = Note;
