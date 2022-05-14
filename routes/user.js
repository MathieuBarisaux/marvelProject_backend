const express = require("express");
const router = express.Router();

// Model
const User = require("../models/User");

// Crypto-js
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// ** Signup **
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.fields;
    if ((name, email, password)) {
      const checkMail = await User.find({ email: email });

      if (checkMail.length < 1) {
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = await new User({
          email: email,
          name: name,
          token: token,
          salt: salt,
          hash: hash,
        });

        await newUser.save();

        res.status(200).json({ _id: newUser._id, token: newUser.token });
      } else {
        res.status(409).json({ message: "This mail already use." });
      }
    } else {
      res
        .status(409)
        .json({ message: "We need more element to create your account" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Login **
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.fields;

    const findUser = await User.findOne({ email: email });

    if (findUser) {
      const testHash = SHA256(password + findUser.salt).toString(encBase64);

      if (testHash === findUser.hash) {
        res.status(200).json({ id: findUser._id, token: findUser.token });
      } else {
        res
          .status(409)
          .json({ message: "Your email or password is not correct" });
      }
    } else {
      res
        .status(409)
        .json({ message: "Your email or password is not correct" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
