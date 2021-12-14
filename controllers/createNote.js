const Note = require("../models/Note");

const createNote = async (req, res) => {
  const { avatar, title, description } = req.body;

  try {
    if (!title) return res.send({ status: "Missing Title" });
    if (!description) return res.send({ status: "Missing Description" });

    const note = await Note.create(req.body);

    res.send({ note: note });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

module.exports = { createNote };
