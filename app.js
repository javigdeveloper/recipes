const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const communityRoutes = require("./routes/communityRoutes");
const userRoutes = require("./routes/userRoutes");
// const { response } = require("express");
// const { render } = require("ejs");
require("dotenv").config();

const app = express();

// connecting to mongoDB:
let mongoDB = `mongodb+srv://javigdeveloper:${process.env.MONGO_PASSWORD}@recipesdb.pezey.gcp.mongodb.net/recipetest?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine:
app.set("view engine", "ejs");

// middleware & static files:
app.use(express.static("public"));
// for submitted form from ejs file to make it a workable format:
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  // res.render("index", { data });
  res.render("index");
});

app.use("/community", communityRoutes);

// user routes
app.use("/register", userRoutes);

// api routes:
app.get("/ing/:ingredient", (req, res) => {
  console.log(req.params);
  const food = req.params.ingredient;
  console.log(food);
  fetch(
    `https://api.edamam.com/search?q=${food}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
  )
    .then((promise) => {
      promise.json().then((datos) => {
        res.send(datos);
        console.log(datos);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// not found:
app.use((req, res) => {
  res.status(404).render("404");
});
