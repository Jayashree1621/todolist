const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tests");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err)); // Good practice to add a status code
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is Running on port 3001");
});
