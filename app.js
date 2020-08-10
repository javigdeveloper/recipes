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
  // res.render("index", { data });
  res.render("index");
});

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

app.get("/about", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.status(404).render("404");
});
