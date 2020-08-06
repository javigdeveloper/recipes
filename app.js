const express = require("express");
const fetch = require("node-fetch");
const { response } = require("express");
require("dotenv").config();

const app = express();

// register view engine:
app.set("view engine", "ejs");

app.listen(3000);

// middleware & static files:
app.use(express.static("public"));

app.get("/", (req, res) => {
  fetch(
    `https://api.edamam.com/search?q=chicken&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
  )
    .then((promise) => promise.json())
    .then((data) => {
      console.log(data.hits[0].recipe.image);
      res.render("index", { data });
    });
});

app.get("/about", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.status(404).render("404");
});
