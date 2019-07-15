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
  location: String,
  facebookLink: String,
  twitterLink: String,
  avatar: String,
  about: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
