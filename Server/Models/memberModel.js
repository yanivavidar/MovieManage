const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("members", MemberSchema);
