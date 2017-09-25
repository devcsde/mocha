const mongoose = require("mongoose");
const PostSchema = require("../src/Post");
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.trim().length > 2,
      message: "Name must be longer than 2 characters."
    },
    required: [true, "Name is required."]
  },
  posts: [PostSchema],
  postCount: Number
});

const User = mongoose.model("user", UserSchema); // user model is the user class

module.exports = User;
