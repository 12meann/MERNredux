const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { validatePost } = require("../utilities/validators");

// post a comment
//POST /api/posts/:postid/comment
//auth
router.post("/", auth, (req, res, next) => {
  const { content } = req.body;
  if (content.trim() === "") {
    res.status(400).json({ fail: "Comment must not be empty." });
  }
  //get post
  Post.findById(req.params.postid)
    .then(post => {
      const newComment = new Comment({
        content,
        commentedBy: req.user.id,
        post: req.params.postid
      });
      //save comment to Comment
      newComment
        .save()
        .then(comment => {
          //add comment to post.comments array
          post.comments.push(comment);
          post.save().then(doc => {
            doc
              .populate("postedBy", "username image")
              .populate({
                path: "comments",
                populate: { path: "commentedBy", select: "username image" }
              })
              .execPopulate()
              .then(() => {
                res.json({
                  success: "Comment succesfully added",
                  comment: post.comments[post.comments.length - 1]
                });
              });
          });
        })
        .catch(err => {
          console.log(err);
          if (err) {
            res.status(500).json({
              fail: "Something went wrong. Please try again later.",
              err
            });
          }
        });
    })
    .catch(err => {
      console.log(err);
      if (err) {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later.", err });
      }
    });
});

// // show 1 comment
// //GET /api/posts/:postid/comment/:commentid
// //auth
// router.get("/:commentid", auth, (req, res, next) => {
//   Post.findById(req.params.postid)
//     .then(post => {
//       console.log("post", post);
//       if (!post) return res.status.json();
//       Comment.findById(req.params.commentid)
//         .then(comment => {
//           console.log("comment", comment);
//           res.json(comment);
//         })
//         .catch(err => {
//           if (err) {
//             if (err.kind === "ObjectId") {
//               return res.status(400).json({ fail: "Comment not found" });
//             } else {
//               res
//                 .status(500)
//                 .json({ fail: "Server error. Please try again later.", err });
//             }
//           }
//         });
//     })
//     .catch(err => {
//       if (err) {
//         if (err.kind === "ObjectId") {
//           return res
//             .status(400)
//             .json({ fail: "Post not found. Please try again later." });
//         } else {
//           res.status(500).json({
//             fail: "Something went wrong. Please try again later.",
//             err
//           });
//         }
//       }
//     });
// });

// show comments from 1 post
//GET /api/posts/:postid/comment/
//auth
router.get("/", auth, (req, res, next) => {
  Comment.find({ post: req.params.postid })
    .populate("commentedBy", "username image")
    .exec()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(400).json({ fail: "Post not found" });
        } else {
          res.status(500).json({
            fail: "Something went wrong. Please try again later.",
            err
          });
        }
      }
    });
});

//delete a comment
// DELETE @ /api/posts/:postid/comment/:commentid
//auth
router.delete("/:commentid", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      //look for post if there
      if (!post) return res.status(400).json({ fail: "Post not found." });
      // look comment
      Comment.findById(req.params.commentid)
        .then(comment => {
          //check comment if there
          if (!comment)
            return res.status(400).json({ fail: "Comment not found." });
          //check if comment was created by the person deleting
          if (comment.commentedBy != req.user.id)
            return res
              .status(400)
              .json({ fail: "You are not allowed to do that." });
          //remove comment from Comment
          comment
            .remove()
            .then(deletedComment => {
              //remove from post.comments array
              const removeIndex = post.comments.map(comment => {
                console.log("comment", comment);
                return comment == deletedComment._id;
              });

              post.comments.splice(removeIndex, 1);
              post.save();
              res.json({
                success: "Comment successfully deleted.",
                deletedComment
              });
            })
            .catch(err => {
              if (err) {
                return res
                  .status(500)
                  .json({ fail: "Server error. Please try again later.", err });
              }
            });
        })

        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(500).json({ fail: "Comment not found" });
          } else {
            res
              .status(500)
              .json({ fail: "Server error. Please try again later.", err });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "Post not found" });
      } else {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later.", err });
      }
    });
});

// update a comment
//PUT /api/posts/:postid/comment/:commentid

router.put("/:commentid", auth, (req, res, next) => {
  const { content } = req.body;
  if (content.trim() === "") {
    res.status(400).json({ fail: "Comment must not be empty." });
  }
  //look post
  Post.findById(req.params.postid)
    .then(post => {
      if (!post) return res.status.json();
      //look comment and update
      Comment.findByIdAndUpdate(
        req.params.commentid,
        req.body,
        { new: true },
        (err, updatedComment) => {
          if (!updatedComment)
            return res.status(400).json({ fail: "Comment not found" });
          if (err) {
            if (err.kind === "ObjectId") {
              return res.status(400).json({ fail: "Comment not found" });
            } else {
              res.status(500).json({
                fail: "Something went wrong. Please try again later.",
                err
              });
            }
            //check if person updating is the one who created it
          } else if (updatedComment.commentedBy != req.user.id) {
            res.status(400).json({ fail: "You are not authorized to do that" });
          } else {
            return res.json({
              updatedComment,
              success: "Comment succesfully updated."
            });
          }
        }
      );
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(400).json({ fail: "Post not found" });
        } else {
          res.status(500).json({
            fail: "Something went wrong. Please try again later.",
            err
          });
        }
      }
    });
});

//add like to a comment
//PUT @ /api/posts/:postid/comment/:commentid/like
//auth
router.put("/:commentid/like", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post", post);
      Comment.findById(req.params.commentid)
        .then(comment => {
          console.log("comment==", comment);
          if (
            comment.likes.filter(like => like.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ fail: "You already liked the comment." });
          }
          comment.likes.unshift(req.user.id);
          comment
            .save()
            .then(() => {
              res.json({ success: "Comment liked.", likes: comment.likes });
            })
            .catch(err => {
              if (err) {
                return res.status(500).json({
                  fail: "Something went wrong. Please try again later."
                });
              }
            });
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(500).json({ fail: "Comment not found" });
          } else {
            res
              .status(500)
              .json({ fail: "Server error. Please try again later.", err });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res
          .status(500)
          .json({ fail: "Post not found. Please try again later." });
      } else {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later.", err });
      }
    });
});

//unlike the comment
//PUT @ /api/posts/:postid/comment/:commentid/unlike
//auth
router.put("/:commentid/unlike", auth, (req, res, next) => {
  Post.findById(req.params.postid)
    .then(post => {
      console.log("post", post);
      Comment.findById(req.params.commentid)
        .then(comment => {
          console.log("comment==", comment);
          if (
            comment.likes.filter(like => like.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ fail: "You haven't like the comment yet." });
          }
          comment.likes.shift(req.user.id);
          comment
            .save()
            .then(() => {
              res.json({ success: "Comment unliked.", likes: comment.likes });
            })
            .catch(err => {
              if (err) {
                return res.status(500).json({
                  fail: "Something went wrong. Please try again later."
                });
              }
            });
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(500).json({ fail: "Comment not found." });
          } else {
            res
              .status(500)
              .json({ fail: "Server error. Please try again later.", err });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "Post not found." });
      } else {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later.", err });
      }
    });
});

module.exports = router;
