const assert = require("assert");
const User = require("../src/User");

describe("UPDATE RECORDS", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: "Joe", likes: 0});
    joe.save()
      .then(() => done());
  });

  function assertion(operation, done) {
   operation
     .then(()=> User.find({}))
     .then((users) => {
       assert(users.length === 1);
       assert(users[0].name === "Jane");
       done();
     });
  }

  it("should update a model instance with set & save", (done) => {
    joe.set({name: "Jane"});
    assertion(joe.save(), done);
  });

  it("should update a model instance", (done) => {
    assertion(joe.update({name: "Jane"}), done);
  });

  it("should update a model class", (done) => {
    assertion(User.update({name: "Joe"}, {name: "Jane"}), done);
  });

  it("should update a model class with one record", (done) => {
    assertion(User.findOneAndUpdate({name:"Joe"}, {name:"Jane"}), done);
  });

  it("should update a model class with an ID", (done) => {
    assertion(User.findByIdAndUpdate(joe._id, {name: "Jane"}), done);
  });

  it("should increment likes on users by one", async () => {
    await User.update({name: "Joe"},{$inc: {likes: 1}});
    const user =  await User.findOne({name: "Joe"});
    assert(user.likes === 1);
  });
});
