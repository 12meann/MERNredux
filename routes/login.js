const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateLogin } = require("../utilities/validators");

//login user
//POST @ /api/login
//public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  //validate input
  const { valid, errors } = validateLogin(user);
  if (!valid) return res.status(400).json(errors);

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "Wrong credentials. Please try again." });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res
            .status(400)
            .json({ msg: "Wrong credentials. Please try again." });

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, //1 hour
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email
              },
              success: `You have succesfully logged in, ${user.username}.`
            });
          }
        );
      });
    })
    .catch(err => {
      if (err)
        return res.status(500).json({
          fail: "Something went wrong. Please try again.",
          err: err
        });
    });
});

module.exports = router;
