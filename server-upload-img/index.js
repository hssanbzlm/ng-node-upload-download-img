const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userApi = require("./userApi");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userApi);

const server = app.listen(3000);
