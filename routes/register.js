const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegister } = require("../utilities/validators");

//register users
router.post("/", (req, res) => {
  const { email, password, username } = req.body;
  //validate input
  const { valid, errors } = validateRegister(req.body);
  if (!valid) return res.status(400).json(errors);

  //check if already registered
  User.findOne({ email }).then(oldUser => {
    if (oldUser)
      return res
        .status(400)
        .json({ email: "That User is already registered. Try logging in." });
  });
  User.findOne({ username }).then(usernameTaken => {
    if (usernameTaken)
      return res.status(400).json({
        username: "That username is already taken. Try other name."
      });
  });
  const newUser = new User({
    email,
    password,
    username
  });

  //salt & hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          console.log("user", user);
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, // 1 hour
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                },
                success: `You have succesfully registered. Welcome, ${
                  user.username
                }!`
              });
            }
          );
        })
        .catch(err => {
          res.status(500).json({
            fail: "Something went wrong. Please try again.",
            err: err
          });
        });
    });
  });
});

module.exports = router;
