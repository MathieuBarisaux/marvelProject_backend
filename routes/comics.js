const express = require("express");
const router = express.Router();

const axios = require("axios");

const apiKey = process.env.MARVEL_APY_KEY;

// ** Search all comics **
router.get("/comics", async (req, res) => {
  try {
    const { limit, skip, title } = req.query;

    let searchParams = "";

    if (limit) {
      searchParams += `&limit=${limit}`;
    }

    if (skip) {
      searchParams += `&skip=${skip}`;
    }

    if (title) {
      searchParams += `&title=${title}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}${searchParams}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Search comics per characters **
router.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
