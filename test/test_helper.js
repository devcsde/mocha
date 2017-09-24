const mongoose = require("mongoose");
const User = require("../src/user");

before((done) => {
  mongoose.connect("mongodb://localhost/users_test", {useMongoClient: true});
  mongoose.connection
    .once("open", ()=>done())
    .on("error", (error) => {
      console.warn("Warning ", error);
    });
});

beforeEach((done) => {
  User.remove({}, ()=> {   // *1
    done();
  });
});





// Code Notes
//
// *1
// mongoose.connection.collections.users.drop(() => {
//   done();
// });
