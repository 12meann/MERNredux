const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const posts = require("./routes/posts");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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

app.use("/api/posts", posts);
app.use("/api/login", login);
app.use("/api/register", register);

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
