const { Buffer } = require("buffer");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const users = [
  { id: 1, name: "hssan", lastName: "Bouzlima", img: "" },
  { id: 2, name: "Sirine", lastName: "trabelsi", img: "" },
];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/get/:idUser", (req, res) => {
  const user = users.find((v) => v.id == req.params.idUser);
  if (user) {
    const userResponse = Object.assign({}, user);
    userResponse.img = "uploads/" + user.img;
    const fs = require("fs");
    const bitmap = fs.readFileSync(userResponse.img);
    userResponse.img = Buffer.from(bitmap).toString("base64");
    res.send(userResponse);
  }
});

router.post("/post/:idUser", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  users.map((u) =>
    u.id == req.params.idUser ? (u.img = req.file.originalname) : u
  );
  res.send(users);
});
module.exports = router;
