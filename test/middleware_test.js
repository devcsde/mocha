const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/User");
const BlogPost = require("../src/BlogPost");

describe("MIDDLEWARE", () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: "Joe"});
    blogPost = new BlogPost({
      title: "Blog Post 1",
      content: "This is the content of blog post 1 ..."
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(()=> done());
  });

  it("should clean users blogPosts on remove", (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});