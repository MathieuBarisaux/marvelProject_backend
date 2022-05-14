require("dotenv").config();

// Express
const express = require("express");
const app = express();

// Formidable Express
const expressFormidable = require("express-formidable");
app.use(expressFormidable());

// CORS
const cors = require("cors");
app.use(cors());

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// ** Roads **
const charactersRoad = require("./routes/characters");
app.use(charactersRoad);
const comicsRoad = require("./routes/comics");
app.use(comicsRoad);
const userRoad = require("./routes/user");
app.use(userRoad);

// ** 404 Not Found **
app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "404 Not Found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/****************************/
app.listen(process.env.PORT, () => {
  console.log("Server on the moon");
});
