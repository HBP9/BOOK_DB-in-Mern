const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Book", BooksSchema);
