const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { validateUserUpdate } = require("../utilities/validators");

// get all users
// GET /api/users
// private
router.get("/", auth, (req, res, next) => {
  console.log(req.user);
  User.find()
    .select("-password")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      if (err) {
        res.status(500).json({ fail: "Something went wrong." });
      }
    });
});

//get currently logged in user data
//PUT @ /api/users/user
//auth
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ fail: "Something went wrong." });
    });
});

// get single user info
// GET /api/users/:userid
// private

router.get("/:userid", auth, (req, res, next) => {
  User.findOne({ _id: req.params.userid })
    .select("-password")
    .then(user => {
      if (!user) return res.status(400).json({ fail: "No user found." });
      res.json(user);
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ fail: "User not found" });
        }
        res.status(500).json({ fail: "Something went wrong.", err });
      }
    });
});

// delete user
// DELETE @ /api/users/
// auth
router.delete("/", auth, async (req, res, next) => {
  try {
    await Post.deleteMany({ postedBy: req.user.id });
    // remove comments by this user
    await Comment.deleteMany({ commentedBy: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ success: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ fail: "Server Error" });
  }
});

//update user or edit user profile
//UPDATE @ /api/users/
//auth
router.put("/", auth, (req, res, next) => {
  //validate input
  const { valid, errors } = validateUserUpdate(req.body);
  if (!valid) return res.status(400).json(errors);

  // check if username is taken

  User.findOne({ username: req.body.username })
    .then(usernameTaken => {
      if (usernameTaken) {
        return res.status(400).json({
          username: "That username is already taken. Try other name."
        });
      } else {
        User.findByIdAndUpdate(
          req.user.id,
          req.body,
          { new: true },
          (err, doc) => {
            if (err)
              return res.status(500).json({ fail: "Something went wrong" });
            return res.json({
              success: `You have succesfully updated your profile, ${
                doc.username
              }.`,
              doc
            });
          }
        );
      }
    })
    .catch(err => {
      if (err)
        return res
          .status(500)
          .json({ fail: "Something went wrong. Please try again." });
    });
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

//add like to a user
//PUT @ /api/users/:userid/like
//auth
router.put("/:userid/like", auth, (req, res, next) => {
  User.findById(req.params.userid)
    .then(user => {
      console.log("user=", user);
      console.log("likes=", user.likes);
      console.log("userId", req.user.id);
      if (
        user.likes.filter(like => like.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: "You already liked the User." });
      }
      user.likes.unshift(req.user.id);
      user
        .save()
        .then(() => {
          res.json(user.likes);
        })
        .catch(err => {
          if (err) {
            return res.status(500).json({ fail: "Something went wrong." });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "No post found" });
      } else {
        res.status(500).json({ fail: "Server error", err });
      }
    });
});

//unlike a user
//PUT @ /api/users/:userid/unlike
//auth
router.put("/:userid/unlike", auth, (req, res, next) => {
  User.findById(req.params.userid)
    .then(user => {
      console.log("user=", user);
      console.log("likes=", user.likes);
      console.log("userId", req.user.id);
      if (
        user.likes.filter(like => like.toString() === req.user.id).length === 0
      ) {
        return res.status(400).json({ msg: "You haven't like the post yet." });
      }
      user.likes.shift(req.user.id);
      user
        .save()
        .then(() => {
          res.json(user.likes);
        })
        .catch(err => {
          if (err) {
            return res.status(500).json({ fail: "Something went wrong." });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "No post found" });
      } else {
        res.status(500).json({ msg: "Server error", err });
      }
    });
});

module.exports = router;
