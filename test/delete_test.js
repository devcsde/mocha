const assert = require("assert");
const User = require("../src/user");

describe("Delete a user", () => {
  let joe;
  const assertion = () => {
    User.findOne({name: "Joe"}, (user) => {
      assert(user === null);
    });
  };

  beforeEach((done) => {
    joe = new User({name: "Joe"});
    joe.save()
      .then(() => done());
  });

  it("should remove a  model instance", async () => {
    await joe.remove();
    const user = await User.findOne({name: "Joe"});
    assert(user === null);
    // joe.remove()
    //   .then(() => User.findOne({name: "Joe"}))
    //   .then((user) => {
    //     assert(user === null);
    //     done();
    //   })
  });

  it ("should remove a class method", async () => {
    await User.remove({name: "Joe"});
    assertion();
  });

  it ("should remove a class method with findOneAndRemove", async () => {
    await User.findOneAndRemove({name: "Joe"});
    const user = await User.findOne({name: "Joe"});
    assert(user === null);
  });

  it("should remove a class method with findByIdAndRemove", async () => {
    await User.findByIdAndRemove(joe._id);
    assertion();
  });

});