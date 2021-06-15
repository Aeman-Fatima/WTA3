const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

var cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const jsonObject = [
  {
    "id": 0,
    "idts": "FA18-BSE-048",
    "name": "Aeman",
    "gender": "Female",
    "email": "fatima@aeman.com",
    "address": {
      "country": "Pakistan",
      "city": "Rawalpindi",
      "street_address": "Canal Gardens"
    },
    "course_code": "CEE100",
    "phone_numbers": ["1234-123123", "051-12234121"],
    "age": 20
  }
];

let startID = jsonObject.length;


app.get("/api", function (req, res) {
  return res.json(jsonObject);
});

app.post("/api", function (req, res) {
  console.log();
  jsonObject.push(req.body);
  jsonObject[jsonObject.length - 1].id = startID++;
  res.send(jsonObject);
});

app.get("/api/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index)
      return res.json(jsonObject[index]);
  }
  return res.status(404).send("Record not found");
});

app.put("/api/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index) {
      var keys = Object.keys(req.body);
      for (let key = 0; key < keys.length; key++) {
        jsonObject[index][keys[key]] = req.body[keys[key]];
      }
      return res.json(jsonObject[index]);
    }
  }
  return res.status(404).send("Failed to update, record not found.");
});

app.delete("/api/:index", function (req, res) {
  for (let index = 0; index < jsonObject.length; index++) {
    if (jsonObject[index].id == req.params.index) {
      jsonObject.splice(index, 1);
      return res.status(200).send("Removed!");
    }
  }
  return res.status(200).send("Removed.");
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`running at PORT ${PORT}`);
});

