const express = require("express");
const router = express.Router();
const User = require("../../database/schema/user");

router.get("/", async (req, res) => {
  const users = await User.find().lean();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).lean();
  res.send(user);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const user = new User({ name: body.name, lastname: body.lastname, nickname: body.nickname, age: body.age });
  await user.save();
  const response = {
    status: "success",
    data: user,
  };
  res.status(201).send(response);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findOne({ _id: id });
  user.name = body.name;
  user.age = body.age;
  await user.save();
  const response = {
    status: "success",
    data: user,
  };
  res.status(200).send(response);
});

router.patch("/:id/age", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findOne({ _id: id });
  user.age = body.age;
  await user.save();
  const response = {
    status: "success",
    data: user,
  };
  res.status(200).send(response);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id });
  const response = {
    status: "success",
  };
  res.status(200).send(response);
});

module.exports = router;
