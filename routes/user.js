const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Book = require("../model/books");
const Fav = require("../model/fav");
const Buy = require("../model/buy");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "EXPRESSTESTWITHJWT";

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.send({ status: "error", message: "Please Enter All Field" });
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.send({ status: "error", message: "Email Already Exist" });
  }

  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res.send({ status: "error", message: "User Already Exist" });
  }

  const cryptPassword = await bcrypt.hash(password, 12); //to encrypt or hash password
  const newUser = new User({ email, password: cryptPassword, username });
  try {
    let newUserResponse = await newUser.save();
    if (newUserResponse) {
      return res.send({ status: "success", message: "Sucessfully Registered" });
    } else {
      return res.send({ status: "error", message: "No User created" });
    }
  } catch (error) {
    return res.send({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { password, username } = req.body;

  if (!password || !username) {
    return res.send({ status: "error", message: "Please Enter Valid Fields" });
  }

  const checkUsername = await User.findOne({ username });
  if (!checkUsername) {
    return res.send({ status: "error", message: "Invalid Username" });
  }

  const checkPassword = await bcrypt.compare(password, checkUsername.password);
  if (!checkPassword) {
    return res.send({ status: "error", message: "Invalid Password" });
  }

  const token = jwt.sign({ username: checkUsername.username }, SECRET_KEY, {
    expiresIn: "1h",
  }); //adding jwt token
  res.cookie("token", token, { maxAge: 3600000, httpOnly: true }); //adding it as a cookie
  return res.send({ msg: "success", user: username });
});

router.post("/addFav", async (req, res) => {
  const { title, user } = req.body;
  const favBook = await Book.find({ title });
  const existingFav = await Fav.findOne({ title, user });
  if (existingFav) {
    return res.status(400).send({ msg: "Book already exists in favorites" });
  }
  const newFav = new Fav({
    title,
    author: favBook[0].author,
    genre: favBook[0].genre,
    user,
  });
  try {
    const favCreated = newFav.save();
    if (favCreated) {
      return res.status(200).send({ msg: "saved" });
    } else {
      return res.status(501).send({ msg: "Failed" });
    }
  } catch (error) {
    return res.send({ msg: error });
  }
});

router.get("/getFavs/:user", async (req, res) => {
  try {
    const favorites = await Fav.find({ user: req.params.user });
    if (favorites) {
      return res.send(favorites).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(501);
  }
});

router.post("/buy", async (req, res) => {
  const { title, user } = req.body;
  const buyBook = await Book.find({ title });
  const existingBought = await Buy.findOne({ title, user });
  if (existingBought) {
    return res.send({ msg: "Already Bought" }).status(400);
  }
  const newBuy = new Buy({
    title,
    author: buyBook[0].author,
    genre: buyBook[0].genre,
    user,
  });
  try {
    const bookBought = newBuy.save();
    if (bookBought) {
      return res.send({ msg: "Book Purchased" }).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(501);
  }
});

router.get("/getBuys/:user", async (req, res) => {
  try {
    const purchased = await Buy.find({ user: req.params.user });
    if (purchased) {
      return res.send(purchased).status(200);
    }
  } catch (error) {
    return res.send({ msg: error }).status(501);
  }
});

module.exports = router;
