const User = require("../src/User");
const assert = require("assert");

describe("FIND RECORDS", () => {
  let joe, chris, alex, klaus;

  beforeEach((done) => {

    alex = new User({name: "Alex"});
    chris = new User({name: "Chris"});
    joe = new User({name: "Joe"});
    klaus = new User({name: "Klaus"});

    Promise.all([ alex.save(), chris.save(), joe.save(), klaus.save()])
      .then(() => done());
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
  });

  it("should sort, skip and limit the result set", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Chris");
        assert(users[1].name === "Joe");
        done();
      })
  });
});

// User.find() returns an array of objects
// User.findOne() returns an object
//
// ._id is an ObjectId{_id: "asdsadasdasdaadsa"}, so we
// need .toString() to compare/ assert