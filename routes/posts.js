const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { validatePost } = require("../utilities/validators");
const auth = require("../middleware/auth");

// get all posts
//GET @ /posts/
//public
router.get("/", (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      return res.json(posts);
    });
});

// create new post
//POST @ /posts/
//auth
router.post("/", auth, (req, res, next) => {
  const { content } = req.body;

  //check fields if empty
  const { valid, errors } = validatePost(req.body);
  if (!valid) return res.status(400).json(errors);

  // look for user
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "You are not authorized to do that." });
      const newPost = new Post({
        content,
        postedBy: req.user.id
      });

      newPost
        .save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: "Something went wrong 1", err });
          }
        });
    })
    .catch(err => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong 2", err });
      }
    });
});

// get one post
//GET @ /posts/:postid
//public
router.get("/:postid", (req, res, next) => {
  Post.findOne({ _id: req.params.postid })
    .then(post => {
      if (post === null) return res.json({ msg: "No post found" });
      res.json(post);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ msg: "No post found" });
      } else {
        res.status(500).json({ msg: "Server error", err });
      }
    });
});

//delete post
// DELETE @ /posts/:postid
//auth
router.delete("/:postid", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      //check post if there
      if (!post) return res.status(400).json({ msg: "Post not found" });
      //check if post was created by the person deleting
      if (post.postedBy != req.user.id)
        return res.status(400).json({ msg: "You are not allowed to do that" });
      //remove post
      post
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
        return res.status(500).json({ msg: "No post found" });
      } else {
        res.status(500).json({ msg: "Server error", err });
      }
    });
});

//update post
//UPDATE @ /posts/:postid

router.put("/:postid", auth, (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postid,
    req.body,
    { new: true },
    (err, updatedContent) => {
      console.log("updatedContent", updatedContent);
      console.log("userId", req.user.id);

      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ msg: "Post not found" });
        } else {
          res.status(500).json({ msg: "Something went wrong", err });
        }
      } else if (updatedContent.postedBy != req.user.id) {
        res.status(400).json({ msg: "You are not authorized to do that" });
      } else {
        return res.json(updatedContent);
      }
    }
  );
});

module.exports = router;
