const assert = require("assert");
const User = require("../src/User");

describe("VIRTUAL TYPES", () => {
  it("postCount should return number of posts", async() => {
    const joe = new User({
      name: "Joe",
      posts: [{title: "Post Title 1"}, {title: "Post Title 2"}]
    });
    await joe.save();
    const user = await User.findOne({name: "Joe"});
    assert(joe.postCount === 2);
  })
});