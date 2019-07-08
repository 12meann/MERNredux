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
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
