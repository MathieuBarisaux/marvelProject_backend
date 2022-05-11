const express = require("express");
const router = express.Router();

const axios = require("axios");

const apiKey = process.env.MARVEL_APY_KEY;

// ** Read all characters **
router.get("/characters", async (req, res) => {
  try {
    const { limit, skip, name } = req.query;

    let searchParams = "";

    if (limit) {
      searchParams += `&limit=${limit}`;
    }

    if (skip) {
      searchParams += `&skip=${skip}`;
    }

    if (name) {
      searchParams += `&name=${name}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}${searchParams}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Search one characters **
router.get("/characters/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
