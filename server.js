const bodyParser = require("body-parser");
const {
  addNewVisitor,
  listAllVisitors,
  viewVisitor,
  deleteAVisitor,
  updateVisitor,
} = require("./src/app");
const express = require("express");
const app = express();
const { serverConfig } = require("./src/configuration");
const port = serverConfig.Port;
const urlLink = `${serverConfig.Host}:${port}/${serverConfig.Url}`;

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get(`/${serverConfig.Url}`, async (req, res, next) => {
  const visitor = await listAllVisitors();
  res.render("index", {
    text: "This is EJS",
    data: visitor.rows,
    link: urlLink,
  });
});

app.get(`/${serverConfig.Url}:id`, async (req, res) => {
  const id = req.params.id;
  const viewOneVisitor = await viewVisitor(id);
  res.render("updateUser", { user: viewOneVisitor, link: urlLink, userID: id });
});

app.post("/", async (req, res, next) => {
  try {
    const name = req.body.VisitorName;
    const assistedBy = req.body.AssistentName;
    const age = req.body.VisitorAge;
    const date = req.body.DateOfVisit;
    const time = req.body.TimeOfVisit;
    const comments = req.body.Comments;
    addNewVisitor(name, age, date, time, assistedBy, comments);
    res.redirect(`/${serverConfig.Url}`);
  } catch (err) {
    next(err);
  }
});
app.delete(`/${serverConfig.Url}/:id`, async (req, res) => {
  const id = req.params.id;
  await deleteAVisitor(id);
  res.send({
    message: "User was deleted successfully!",
  });
});

app.post(`/${serverConfig.Url}:id`, async (req, res, next) => {
  try {
    await updateVisitor(
      req.body.id,
      req.body.name,
      req.body.age,
      req.body.date,
      req.body.time,
      req.body.assisted,
      req.body.comments
    );
    res.redirect(`/${serverConfig.Url}`);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => console.info(`Listening on http://${urlLink}`));
