const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// post a comment
//POST /api/posts/:postid/comment

router.post("/", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post", post);

      const newComment = new Comment({
        content: req.body.content,
        commentedBy: req.user.id
      });
      console.log("newComment", newComment);
      newComment
        .save()
        .then(comment => {
          console.log("comment", comment);
          post.comments.push(comment);
          post.save().then(() => {
            res.json(post.comments);
          });
        })
        .catch(err => {
          if (err) {
            res.status(500).json({ msg: "Server error 1", err });
          }
        });
    })
    .catch(err => {
      if (err) {
        res.status(500).json({ msg: "Server error 2", err });
      }
    });
});

// show 1 comment
//GET /api/posts/:postid/comment/:commentid
//auth
router.get("/:commentid", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post", post);
      if (!post) return res.status.json();
      Comment.findById(req.params.commentid)
        .then(comment => {
          console.log("comment", comment);
          res.json(comment);
        })
        .catch(err => {
          if (err) {
            if (err.kind === "ObjectId") {
              return res.status(400).json({ msg: "Comment not found" });
            } else {
              res.status(500).json({ msg: "Server error", err });
            }
          }
        });
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(400).json({ msg: "Post not found" });
        } else {
          res.status(500).json({ msg: "Something went wrong", err });
        }
      }
    });
});

//delete comment
// DELETE @ /api/posts/:postid/comment/:commentid
//auth
router.delete("/:commentid", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      //check post if there
      if (!post) return res.status(400).json({ msg: "Post not found" });

      Comment.findById(req.params.commentid)
        .then(comment => {
          //check comment if there
          if (!comment)
            return res.status(400).json({ msg: "Comment not found" });
          //check if comment was created by the person deleting
          if (comment.commentedBy != req.user.id)
            return res
              .status(400)
              .json({ msg: "You are not allowed to do that" });
          //remove comment
          comment
            .remove()
            .then(deletedComment => {
              console.log("deletedComment", deletedComment);
              const removeIndex = post.comments.map(comment => {
                console.log("comment", comment);
                return comment == deletedComment._id;
              });

              post.comments.splice(removeIndex, 1);
              post.save();
              res.json(post.comments);
            })
            .catch(err => {
              if (err) {
                return res.status(500).json({ msg: "Server error", err });
              }
            });
        })

        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(500).json({ msg: "Comment not found" });
          } else {
            res.status(500).json({ msg: "Server error", err });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ msg: "Post not found" });
      } else {
        res.status(500).json({ msg: "Server error", err });
      }
    });
});

// update comment
//PUT /api/posts/:postid/comment/:commentid

router.put("/:commentid", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      if (!post) return res.status.json();
      Comment.findByIdAndUpdate(
        req.params.commentid,
        req.body,
        { new: true },
        (err, updatedComment) => {
          console.log(updatedComment);
          if (!updatedComment)
            return res.status(400).json({ msg: "Comment not found" });
          if (err) {
            if (err.kind === "ObjectId") {
              return res.status(400).json({ msg: "Comment not found" });
            } else {
              res.status(500).json({ msg: "Something went wrong", err });
            }
          } else if (updatedComment.commentedBy != req.user.id) {
            res.status(400).json({ msg: "You are not authorized to do that" });
          } else {
            return res.json(updatedComment);
          }
        }
      );
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(400).json({ msg: "Post not found" });
        } else {
          res.status(500).json({ msg: "Something went wrong", err });
        }
      }
    });
});

module.exports = router;
