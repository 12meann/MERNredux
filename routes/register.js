const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegister } = require("../utilities/validators");

//register users
router.post("/", (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  //check if already registered
  User.findOne({ email })
    .then(oldUser => {
      if (oldUser) {
        return res
          .status(400)
          .json({ email: "That User is already registered. Try logging in." });
      } else {
        //check if username is not yet taken
        User.findOne({ username })
          .then(usernameTaken => {
            if (usernameTaken) {
              return res.status(400).json({
                username: "That username is already taken. Try other name."
              });
            } else {
              const newUser = new User({
                email,
                password,
                username
              });

              //validate input
              const { valid, errors } = validateRegister(req.body);

              if (!valid) return res.status(400).json(errors);

              //salt & hash password
              bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser

                    .save()
                    .then(user => {
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
                            success: "You have succesfully registered"
                          });
                        }
                      );
                    })
                    .catch(err => {
                      res.json({ msg: "Something went wrong 1", err: err });
                    });
                });
              });
            }
          })
          .catch(err => {
            if (err) {
              res.status(500).json({ msg: "Something went wrong 2", err: err });
            }
          });
      }
    })
    .catch(err => {
      res.json({ msg: "Something went wrong." });
    });
});

module.exports = router;
