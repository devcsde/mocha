const User = require("../src/user");
const assert = require("assert");

describe("CREATE RECORDS", () => {
  it("should create a new user", (done) => {
    let joe = new User({name: "Joe"});
    joe.save().then(() => {
      assert(!joe.isNew); // *1 | if model is created, but not inserted into db yet
      done();             //      mongoose gives it the isNew attr
    })

  });
});






// Code Notes
//
// *1
// assert(User.find({name: "Joe"}));