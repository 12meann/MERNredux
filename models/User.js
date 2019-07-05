const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    require: true,
    unique: true
  },
  // posts: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Post"
  // }
  avatar: String,
  about: String
});

const User = mongoose.model("user", userSchema);
module.exports = User;
