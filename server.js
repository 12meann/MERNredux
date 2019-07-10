const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const posts = require("./routes/posts");
const comments = require("./routes/comments");
const users = require("./routes/users");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MOngoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Home");
});

//routes

app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/posts/:postid/comment", comments);

//error handler catch all
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Started listening at port ${PORT}`);
});