const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
