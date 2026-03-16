const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

function readData() {
  return JSON.parse(fs.readFileSync("phones.json"));
}

function writeData(data) {
  fs.writeFileSync("phones.json", JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  const data = readData();
  res.render("index", { phones: data.phones });
});

app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

app.get("/Add", (req, res) => {
  const data = readData();
  res.render("add", { phones: data.phones });
});

app.post("/Add", (req, res) => {
  const data = readData();

  const newPhone = {
    id: Date.now(),
    name: req.body.name,
    phone: req.body.phone
  };

  data.phones.push(newPhone);
  writeData(data);

  res.redirect("/");
});

app.get("/Update", (req, res) => {
  const data = readData();
  const phone = data.phones.find(p => p.id == req.query.id);

  res.render("update", {
    phones: data.phones,
    phone
  });
});

app.post("/Update", (req, res) => {
  const data = readData();

  const phone = data.phones.find(p => p.id == req.body.id);

  phone.name = req.body.name;
  phone.phone = req.body.phone;

  writeData(data);

  res.redirect("/");
});

app.post("/Delete", (req, res) => {
  const data = readData();

  data.phones = data.phones.filter(p => p.id != req.body.id);

  writeData(data);

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});