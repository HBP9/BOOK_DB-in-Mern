const express = require("express");
const router = express.Router();
const Books = require("../model/books");
const data = require("../defaultBook.js");

router.use("/user", require("./user.js"));
router.use("/admin", require("./admin.js"));

router.get("/getBooks", async (req, res) => {
  try {
    const bookData = await Books.find({});
    res.send(bookData).status(201);
  } catch (error) {
    console.log(error);
    res.status(512).send(error.message);
  }
});

router.post("/seed", async (req, res) => {
  try {
    await Books.deleteMany({});
    const createdBooks = await Books.insertMany(data.Books);
    res.status(200).send({ createdBooks });
  } catch (error) {
    console.log(error);
    res.status(512).send(error.message);
  }
});

module.exports = router;
