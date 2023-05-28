const express = require("express");
const router = express.Router();
const Book = require("../model/books");

router.post("/addbook", async (req, res) => {
  const { title, author, genre } = req.body;
  const newBook = await new Book({ title, author, genre });
  try {
    const bookAdded = await newBook.save();
    if (bookAdded) {
      return res.send({ msg: "New Book Added" }).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(501);
  }
});

router.post("/delbook", async (req, res) => {
  const delBook = await Book.deleteOne({ title: req.body.title });
  try {
    if (delBook) {
      return res.send({ msg: "Deleted" }).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(501);
  }
});

router.put("/editbook", async (req, res) => {
  const { title, author, genre } = req.body;
  const updateBook = await Book.findOneAndUpdate(
    { title },
    { title, author, genre }
  );
  try {
    if (updateBook) {
      return res.send(updateBook).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(500);
  }
});

module.exports = router;
