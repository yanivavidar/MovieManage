const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("users", UserSchema);
