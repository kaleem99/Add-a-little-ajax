const { Visitor, load, getFileName } = require("../src/main");
const fs = require("fs");
const alice = new Visitor(
  "Alice Cooper",
  36,
  "2020-08-12",
  "11:55",
  "excellent service",
  "trevor philips"
);
const fileName = getFileName(alice.fullName);

describe("function save()", function () {
  beforeEach(function () {
    spyOn(fs, "writeFile");
    alice.save();
  });
  it("should save the Visitor instance data for alice", function () {
    expect(fs.writeFile).toHaveBeenCalledOnceWith(
      fileName,
      JSON.stringify(alice, null, 4),
      jasmine.any(Function)
    );
  });
});

describe("function load()", function () {
  beforeEach(function () {
    spyOn(fs, "readFile");
    load(alice.fullName);
  });
  it("should load the visitor data", function () {
    expect(fs.readFile).toHaveBeenCalledOnceWith(
      fileName,
      "utf8",
      jasmine.any(Function)
    );
  });
});
