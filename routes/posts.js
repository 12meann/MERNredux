const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { validatePost } = require("../utilities/validators");
const auth = require("../middleware/auth");

// get all posts
//GET @ /api/posts/
//public
router.get("/", (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .populate("postedBy", "username -_id")
    .populate({
      path: "comments",
      populate: {
        path: "commentedBy",
        select: "username -_id"
      }
    })
    .populate("likes", "username -_id")
    .exec()
    .then(posts => {
      return res.json(posts);
    });
});

// create new post
//POST @ /api/posts/
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
//GET @ /api/posts/:postid
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
// DELETE @ /api/posts/:postid
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
        .then(deletedPost => {
          Comment.remove({ _id: { $in: post.comments } }, err => {
            if (err) {
              return res.status(500).json({ msg: "Something went wrong" });
            }
          });
          res.status(200).json({
            msg: "You have succesfully deleted the post",
            deletedPost
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
//PUT @ /api/posts/:postid
//auth
router.put("/:postid", auth, (req, res, next) => {
  //check fields if empty
  const { valid, errors } = validatePost(req.body);
  if (!valid) return res.status(400).json(errors);

  Post.findByIdAndUpdate(
    req.params.postid,
    req.body,
    { new: true },
    (err, updatedContent) => {
      if (!updatedContent)
        return res.status(400).json({ msg: "Post not found" });
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(400).json({ msg: "Post not found" });
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

//add like to a post
//PUT @ /api/posts/:postid/like
//auth
router.put("/:postid/like", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post=", post);
      console.log("likes=", post.likes);
      console.log("userId", req.user.id);
      if (
        post.likes.filter(like => like.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: "You already liked the post." });
      }
      post.likes.unshift(req.user.id);
      post
        .save()
        .then(() => {
          res.json(post.likes);
        })
        .catch(err => {
          if (err) {
            return res.status(500).json({ msg: "Something went wrong." });
          }
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

//unlike a post
//PUT @ /api/posts/:postid/unlike
//auth
router.put("/:postid/unlike", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post=", post);
      console.log("likes=", post.likes);
      console.log("userId", req.user.id);
      if (
        post.likes.filter(like => like.toString() === req.user.id).length === 0
      ) {
        return res.status(400).json({ msg: "You haven't like the post yet." });
      }
      post.likes.shift(req.user.id);
      post
        .save()
        .then(() => {
          res.json(post.likes);
        })
        .catch(err => {
          if (err) {
            return res.status(500).json({ msg: "Something went wrong." });
          }
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
module.exports = router;
