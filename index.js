const express = require("express");
var bodyparser = require("body-parser");
const TodoTask = require("./model");
const { ObjectID, ObjectId } = require("mongodb");
const app = express();
app.use(bodyparser.json());
var db = "";
var mongoClient = require("mongodb").connect(
  "mongodb://localhost:27017",
  function (err, client) {
    if (err) throw err;
    console.log("Connected Successfully To MongoDB Database");
    db = client.db("Todo_list");
  }
);

app.get("/list", function (req, res) {
  db.collection("list", function (err, collection) {
    collection.find().toArray(function (err, items) {
      if (err) throw err;
      console.log(items);
      res.json(items);
    });
  });
});

app.post("/addItem", function (req, res) {
  item = req.body.item;

  db.collection("list", function (err, collection) {
    collection.insertOne({ "item": item });
    console.log("Added");
    res.json("Inserted Succcess");
  });
});

app.delete("/deleteItem/:id", function (req, res) {
  id = req.params.id
  db.collection("list", function (err, collection) {
    collection.deleteOne({ "_id": ObjectId(id) }, function (err) {
      if (err) throw err;
    });
    if (err) throw err;
    else
      res.json("Delete By Id Succcess");
  });
});

app.post("/updateItem/:id", function (req, res) {
  id = req.params.id;
  item = req.body.item;
  db.collection("list", function (err, collection) {
    collection.updateOne({ "_id": ObjectId(id) }, { $set: { "item": item } })
    if (err) throw err;
    res.json("Updated Successfully");
  });
})


app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
