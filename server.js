require("dotenv").config();

const express = require("express");
const app = express();

const expressFormidable = require("express-formidable");
app.use(expressFormidable());

const cors = require("cors");
app.use(cors());

// ** Roads **
const charactersRoad = require("./routes/characters");
app.use(charactersRoad);
const comicsRoad = require("./routes/comics");
app.use(comicsRoad);

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
