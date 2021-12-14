const Note = require("../models/Note");

const getPosts = async (req, res) => {
  try {
    const places = await Note.find().sort({createdAt: -1}).limit(20);

    res.status(200).json(places);
  } catch (err) {}
};

module.exports = { getPosts };
