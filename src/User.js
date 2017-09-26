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
  likes: Number,
  blogPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogPost"
  }]
});

UserSchema.virtual("postCount").get(function(){  //virtual types
  return this.posts.length;
});

// middleware can be use pre and post to query
// it can be used on init, validate, save and remove
UserSchema.pre("remove", function (next) {           // this === user (joe)
  const BlogPost = mongoose.model("blogPost");
  BlogPost.remove({ _id: { $in: this.blogPosts }})
    .then(()=> next());
});

const User = mongoose.model("user", UserSchema); // user model is like the user class

module.exports = User;

