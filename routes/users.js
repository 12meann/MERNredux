const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const { validateUserUpdate } = require("../utilities/validators");

// get all users
// GET /api/users
// private
router.get("/", auth, (req, res, next) => {
  User.find()
    .select("-password")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      if (err) {
        res.status(500).json({ msg: "Something went wrong." });
      }
    });
});

// get single user info
// GET /api/users/:userid
// private

router.get("/:userid", auth, (req, res, next) => {
  User.findOne({ _id: req.params.userid })
    .select("-password")
    .then(user => {
      if (!user) return res.status(400).json({ msg: "No user found." });
      res.json(user);
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ msg: "User not found" });
        }
        res.status(500).json({ msg: "Something went wrong.", err });
      }
    });
});

//delete user
// DELETE @ /api/users/:userid
//auth
router.delete("/:userid", auth, (req, res, next) => {
  User.findById(req.params.userid)
    .then(user => {
      //check user if there
      if (!user) return res.status(400).json({ msg: "User not found" });
      //check if user was created by the person deleting
      if (user._id != req.user.id)
        return res.status(400).json({ msg: "You are not allowed to do that" });
      //remove user
      user
        .remove()
        .then(result => {
          res.status(200).json({
            msg: "You have succesfully deleted the post",
            deletedPost: result
          });
        })
        .catch(err => {
          res.status(500).json({ msg: "Server error", err });
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ msg: "No user found" });
      } else {
        res.status(500).json({ msg: "Server error", err });
      }
    });
});

//update user
//UPDATE @ /api/users/:userid
//auth
router.put("/:userid", auth, (req, res, next) => {
  console.log(req.body);
  //check fields if empty
  const { valid, errors } = validateUserUpdate(req.body);
  if (!valid) return res.status(400).json(errors);

  // find and update user
  User.findByIdAndUpdate(
    req.params.userid,
    req.body,
    { new: true, select: "-password" },
    (err, updatedUser) => {
      if (!updatedUser) return res.status(400).json({ msg: "User not found" });
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ msg: "User not found" });
        } else {
          res.status(500).json({ msg: "Something went wrong", err });
        }
      } else if (updatedUser._id != req.user.id) {
        res.status(400).json({ msg: "You are not authorized to do that" });
      }
      // check if username is taken
      User.findOne({ username: req.body.username })
        .then(usernameTaken => {
          if (usernameTaken) {
            return res.status(400).json({
              username: "That username is already taken. Try other name."
            });
          }
        })
        .catch(err => {
          if (err)
            return res.status(500).json({ msg: "Something went wrong", err });
        });
      // if everything passed, send updatedUser
      return res.json(updatedUser);
    }
  );
});

// get user's posts
//GET /api/users/:userid/posts
//public

router.get("/:userid/posts", (req, res, next) => {
  Post.find({ postedBy: req.params.userid })
    .sort({ date: -1 }) // descending
    .then(post => {
      if (!post) return res.status(400).json({ msg: "No user or post found" });
      return res.status(200).json(post);
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ msg: "User not found" });
        } else {
          res.status(500).json({ msg: "Something went wrong", err });
        }
      }
    });
});

module.exports = router;
