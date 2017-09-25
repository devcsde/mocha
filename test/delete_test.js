const assert = require("assert");
const User = require("../src/User");

describe("DELETE RECORDS", () => {
  let joe;
  const assertion = (operation, done) => {
    operation
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user === null);
        done();
      })
  };

  beforeEach((done) => {
    joe = new User({name: "Joe"});
    joe.save()
      .then(() => done());
  });

  it("should remove a  model instance", (done) => {
    assertion(joe.remove(), done);
    // joe.remove()
    //   .then(() => User.findOne({name: "Joe"}))
    //   .then((user) => {
    //     assert(user === null);
    //     done();
    //   })
  });

  it ("should remove a class method", (done) => {
    assertion(User.remove({name: "Joe"}), done);
  });

  it ("should remove a class method with findOneAndRemove", (done) => {
    assertion(User.findOneAndRemove({name: "Joe"}), done);
  });

  it("should remove a class method with findByIdAndRemove", (done) => {
    assertion(User.findByIdAndRemove(joe._id), done);
  });

});