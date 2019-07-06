const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
  // likes: [
  //   {
  //     id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User"
  //     },
  //     username: String
  //   }
  // ],
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
