const User = require("../src/user");
const assert = require("assert");

describe("Find User", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: "Joe"});
    joe.save().then(() => done());
  });
  it("Should find user(s) by name", (done) => {
    User.find({name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString()); // ._id is an ObjectID{}, so need .toString()
      done();
    })
  });

  it("Should find user by id", (done) => {
     User.findById(joe._id).then((user) => {
      assert(user.name === joe.name);
      done();
     })
  })
});


// User.find() returns an array of objects
// User.findOne() returns an object
//
// ._id is an ObjectId{_id: "asdsadasdasdaadsa"}, so we
// need .toString() to compare/ assert