const express = require("express");
const app = express();
const port = 3000;

const database = require("./database/connection");
database.openConnection();

const UserController = require("./feature/user/controller");

app.use(express.json()); // for parsing application/json
app.use('/user', UserController);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
