const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    // validate: {
    //   validator: (title) => title.trim().length > 2,
    //   message: "Title must be longer than 2 characters."
    // }
  }
});

module.exports = PostSchema;