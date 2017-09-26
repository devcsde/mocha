const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/User");
const Comment = require("../src/Comment");
const BlogPost = require("../src/BlogPost");

describe("ASSOCIATIONS", () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({name: "Joe"});
    blogPost = new BlogPost({
      title: "Blog Post 1",
      content: "This is the content of blog post 1 ..."
    });
    comment = new Comment({ content: "Very nice post thank you!"});
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    await Promise.all([joe.save(), blogPost.save(), comment.save()]);
  });

  it("should show saved relation between user and a blogpost", async () => {
    const user = await User.findOne({name: "Joe"}).populate("blogPosts");
    assert(user.blogPosts[0].title === "Blog Post 1");
    // User.findOne({name: "Joe"}).then((usere) => {
    //   console.log(user);
    //   done();
    // });
  });

  it("should show content of saved full relation tree", async () => {
    const user = await User.findOne({name: "Joe"})
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      });
    assert(user.name === "Joe");
    assert(user.blogPosts[0].title === "Blog Post 1");
    assert(user.blogPosts[0].comments[0].content === "Very nice post thank you!");
    assert(user.blogPosts[0].comments[0].user.name === "Joe");
  })

});
