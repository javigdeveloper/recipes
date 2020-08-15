const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const communityRoutes = require("./routes/communityRoutes");
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
    console.log("connected yeah");
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

// mongoose and mongo sandbox routes getting recipes using the url:
// app.get("/add-recipe", (req, res) => {
//   const recipe = new Recipe({
//     title: "Chicken with peas",
//     mainIng: "Chicken",
//     body:
//       "Buy the chicken with peas, you make it for 30 minutes and you have chicken with peas",
//   });
//   recipe
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/all-recipes", (req, res) => {
//   Recipe.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-recipe", (req, res) => {
//   Recipe.findById("5f31c5464ad4f20ee46ec0fe")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
