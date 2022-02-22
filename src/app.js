require("dotenv").config();
const { client } = require("./configuration");

client.connect().then(() => {
  console.log("connected successfully");
});

async function createTable() {
  const result = await client.query(`CREATE TABLE IF NOT EXISTS Visitors(
            ID SERIAL,
            Name varchar(50),
            Age int,
            dateOfVisit DATE,
            timeOfVisit TIME,
            assistedBy varchar(50),
            comments varchar(100)
        )`);
  console.log("Table is created or exists");
}

createTable();

async function addNewVisitor(
  fullName,
  Age,
  dateOfVisit,
  timeOfVisit,
  assistedBy,
  comments
) {
  const result = await client.query(
    `INSERT INTO visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
        VALUES($1,$2,$3,$4,$5,$6);`,
    [fullName, Age, dateOfVisit, timeOfVisit, assistedBy, comments]
  );
  return result.rowCount + " Row Inserted";
}

function listAllVisitors() {
  const result = client.query(`SELECT * FROM Visitors;`);
  return result;
}
async function deleteAVisitor(id) {
  const result = await client.query(`DELETE FROM Visitors WHERE ID = $1;`, [
    id,
  ]);
  return result.rowCount + " Row Deleted";
}

async function updateVisitor(
  id,
  fullName,
  Age,
  dateOfVisit,
  timeOfVisit,
  assistedBy,
  comments
) {
  const result = await client.query(
    `UPDATE Visitors SET name = $1, age = $2, dateofvisit = $3, timeofvisit = $4, assistedby = $5, comments = $6 WHERE ID = $7`,
    [fullName, Age, dateOfVisit, timeOfVisit, assistedBy, comments, id]
  );
  return result.rowCount + " Row updated";
}

async function viewVisitor(id) {
  const result = await client.query(`SELECT * FROM Visitors WHERE ID = $1`, [
    id,
  ]);
  return result.rows;
}

async function deleteAllVisitors() {
  const result = await client.query(`DELETE FROM Visitors`);
  return result.rowCount + " Rows Deleted";
}

module.exports = {
  createTable,
  client,
  addNewVisitor,
  updateVisitor,
  deleteAVisitor,
  deleteAllVisitors,
  viewVisitor,
  listAllVisitors,
};
