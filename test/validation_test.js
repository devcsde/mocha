const assert = require("assert");
const User = require("../src/User");

describe("VALIDATE RECORDS", () => {
  it("should require the user name", () => {
    const user = new User({name: undefined});
    const result = user.validateSync();
    assert.equal(result.errors.name.message, "Name is required.")
    // const {message} = result.errors.name;
    // assert(message === "Name is required.");
  });

  it("should have user's name longer than 2 chars", () => {
    const user = new User({name: "Al"});
    const result = user.validateSync();
    assert(result.errors.name.message === "Name must be longer than 2 characters.");
  });

  it("should not save invalid records", (done) => {
    const user = new User({name: "Al"});
    user.save()
      .catch((result) => {
        const { message } = result.errors.name;
        assert.equal(message, "Name must be longer than 2 characters.");
        done();
      })
  });

});