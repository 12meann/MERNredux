const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // likes: [
  //   {
  //     id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User"
  //     },
  //     username: String
  //   }
  // ],
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Comment"
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
