const assert = require("assert");
const User = require("../src/User");

describe("SUBDOCUMENTS", () => {
  it ("should create a user with post embedded", async () => {
    let joe = new User({
      name: "Joe",
      posts:[{title: "Test Post 1"}]
    });
    await joe.save();
    const user = await User.findOne({name: "Joe"});
      assert(user.posts.length > 0 && user.posts[0].title === "Test Post 1");
  });

  it("should create a new post embeded in existing user", async () => {
    let joe = new User({
      name: "Joe",
      posts: [{title: "Test Post 1"}]
    });
    await joe.save();
    await joe.posts.push({title: "Test Post 2"});
    await joe.save();
    const user = await User.findOne({name: "Joe"});
    assert(user.posts.length > 1 && user.posts[1].title === "Test Post 2");
  });

  it("should remove an existing subdocument", async () => {
    let joe = new User({
      name: "Joe",
      posts: [{title: "Test Post 1"}, {title: "Test Post 2"}]
    });
    await joe.save();
    const user = await User.findOne({name: "Joe"});
    await user.posts[0].remove();
    await joe.save();
    assert(user.posts.length === 1 && user.posts[0].title === "Test Post 2");
  })
});