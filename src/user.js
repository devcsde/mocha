const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("user", UserSchema); // user model is the user class

module.exports = User;

