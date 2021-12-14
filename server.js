//IMPORTS
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
module.exports = mongoose;
const bodyParser = require("body-parser");
const cors = require("cors");

const getNotes = require("./routes/getNotes");
const authRoutes = require("./routes/authRoutes");

//DEFINDO A PORTA
const PORT = process.env.PORT || 8000;

//SETING MONGO DB CONECTION
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const DB_CONNECTION_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.c23jz.mongodb.net/NotesForCoders-DB?retryWrites=true&w=majority`;

//MONGO DB MODELS

//INICIALIZANDO EXPRESS
const app = express();

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({
  origin: '*'
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  return next();
});

//POST
app.use("/notes", getNotes);
app.use("/auth", authRoutes);
//

mongoose
  .connect(DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((err) => console.log(err));
