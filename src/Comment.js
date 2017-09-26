const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const CommentSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const Comment = mongoose.model("comment", CommentSchema);  // this is referenced to BlogPosts

module.exports = Comment;