const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

//for image upload
const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
      res
        .status(500)
        .json({ fail: "Something went wrong.Please try again later." });
    });
});

// get static user info
// GET /api/users/:userid
// private

router.get("/:userid", auth, (req, res, next) => {
  let userData = {};
  User.findOne({ _id: req.params.userid })
    .select("-password")
    .then(user => {
      if (!user) return res.status(400).json({ fail: "No user found." });
      userData.user = user;
      return Post.find({ postedBy: req.params.userid })
        .sort({ date: -1 })
        .populate("postedBy", "username image");
    })
    .then(doc => {
      userData.posts = doc;
      res.json(userData);
    })
    .catch(err => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(500).json({ fail: "User not found" });
        }
        res
          .status(500)
          .json({ fail: "Something went wrong. Please try again later.", err });
      }
    });
});

// delete user
// DELETE @ /api/users/
// auth
router.delete("/", auth, async (req, res, next) => {
  try {
    //delete post by this user
    await Post.deleteMany({ postedBy: req.user.id });
    // remove comments by this user
    await Comment.deleteMany({ commentedBy: req.user.id });

    // Remove user
    let user = await User.findOneAndRemove({ _id: req.user.id });
    console.log(user);
    // delete image in cloudinary
    if (user.imageId !== "undefined") {
      await cloudinary.uploader.destroy(user.imageId);
    }
    res.json({ success: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ fail: "Server Error. Please try again later." });
  }
});

//update user or edit user profile
//UPDATE @ /api/users/
//auth
router.put("/", auth, (req, res, next) => {
  const { username } = req.body;
  const regEx = /^[a-z0-9_-]{3,25}$/;

  if (!username.match(regEx))
    return res.status(400).json({
      fail:
        "Username error: Only characters from a-z, 0-9, underscore and hyphen are allowed. Must be 3 to 25 characters."
    });

  User.findByIdAndUpdate(req.user.id, req.body, { new: true }, (err, doc) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res
          .status(400)
          .json({ fail: "That username is already taken. Try other name." });
      }
      return res.status(500).json({
        fail: "Something went wrong. Please try again later.",
        err
      });
    }
    return res.json({
      success: `You have succesfully updated your profile, ${doc.username}.`,
      doc
    });
  });
});

// //add image or avatar
// // POST @ api/users/:userid/addImage
// //auth

// router.post("/:userid/addimage", upload.single("image"), (req, res, next) => {
//   User.findById(req.params.userid)
//     .then(user => {
//       cloudinary.uploader.upload(
//         req.file.path,
//         { folder: "socialMediaApp/avatar" },
//         (err, result) => {
//           if (err) return res.status(500).json({ fail: err.message });
//           user.image = result.secure_url;
//           user.imageId = result.public_id;
//           user.save().then(userImage => {
//             return res
//               .status(200)
//               .json({ userImage, success: "Image uploaded" });
//           });
//         }
//       );
//     })
//     .catch(err => {
//       console.log(err, "err2");
//     });
// });

//edit image or avatar
// PUT @ api/users/:userid/editimage
//auth

router.put("/:userid/editimage", upload.single("image"), (req, res, next) => {
  User.findById(req.params.userid).then(async user => {
    console.log(user.imageId);
    try {
      if (user.imageId !== "socialMediaApp/avatar/no-img") {
        await cloudinary.uploader.destroy(user.imageId);
      }
      let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "socialMediaApp/avatar"
      });
      user.image = result.secure_url;
      user.imageId = result.public_id;
      user.save().then(userImage => {
        return res.status(200).json({ userImage, success: "Image uploaded" });
      });
    } catch (err) {
      console.log(err);
      if (err) return res.status(400).json({ fail: err.message });
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
        return res.status(400).json({ fail: "You already liked the User." });
      }
      user.likes.unshift(req.user.id);
      user
        .save()
        .then(() => {
          res.json({ success: "Liked user.", likes: user.likes });
        })
        .catch(err => {
          if (err) {
            return res
              .status(500)
              .json({ fail: "Something went wrong. Please try again later." });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "No User found" });
      } else {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later.", err });
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
        return res.status(400).json({ fail: "You haven't like the user yet." });
      }
      user.likes.shift(req.user.id);
      user
        .save()
        .then(() => {
          res.json({ success: "Unliked user.", likes: user.likes });
        })
        .catch(err => {
          if (err) {
            return res
              .status(500)
              .json({ fail: "Something went wrong. Please try again later." });
          }
        });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(500).json({ fail: "No User found." });
      } else {
        res
          .status(500)
          .json({ fail: "Server error. Please try again later", err });
      }
    });
});

module.exports = router;
