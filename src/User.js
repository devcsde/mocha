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
  likes: Number
});

UserSchema.virtual("postCount").get(function(){  //virtual types
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema); // user model is like the user class

module.exports = User;

