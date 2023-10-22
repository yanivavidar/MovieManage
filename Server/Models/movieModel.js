const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: String,
    premiereYear: Number,
    genres: [String],
    image: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("movies", MovieSchema);
