const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require("bcrypt");

const User = require("./models/user");

const url =
  "mongodb+srv://tornike123:123@mymongodb-jun7n.mongodb.net/movies?retryWrites=true";
const port = 3002;
const saltRounds = 10;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  let user = await User.findOne({ email }).exec();
  if (user) {
    res.status(400).json({
      message: "User with this email already excists"
    });
  }
  bcrypt.hash(password, saltRounds, (error, hash) => {
    user = User.create({ fullName, email, password: hash });
  });
  res.status(200).json({
    message: "user successfully added"
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    console.log(match)
    if (match) {
      res.status(200).json({
        fullName : user.fullName,
        email
      });
    } else {
      res.status(400).json({
        message: "User not Found"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

app.get("/movies", (req, res) => {
  var fs = require("fs");
  var content = JSON.parse(fs.readFileSync("movies.json"));
  res.status(200).json(content);
});

mongoose.connect(url, { useNewUrlParser: true });

app.listen(port, () =>
  console.log(`Server Started On http://localhost:${port}`)
);
