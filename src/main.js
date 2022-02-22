const fs = require("fs");

class Visitor {
  constructor(fullName, age, date, time, comments, employer) {
    this.fullName = fullName;
    this.age = age;
    this.dateOfVisit = date;
    this.timeOfVisit = time;
    this.comments = comments;
    this.employer = employer;
  }
  save() {
    const objectData = JSON.stringify(this, "\n", 4);
    const fileName = getFileName(this.fullName);
    fs.writeFile(fileName, objectData, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("Information saved");
      }
    });
  }
}
function getFileName(fullName) {
  const fileName = fullName.split(" ").join("_").toLowerCase();
  return `./visitor_${fileName}.json`;
}

function load(name) {
  const fileName = getFileName(name);
  const objectData = fs.readFile(fileName, "utf8", (err, jsonData) => {
    if (err) {
      throw err;
    }
    console.log(JSON.parse(jsonData));
  });
  return objectData;
}

module.exports = { Visitor, load, getFileName };
