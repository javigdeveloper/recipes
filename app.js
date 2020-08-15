const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const { response } = require("express");
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

// recipe routes
app.get("/community", (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("community", { communityRecipes: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/community", (req, res) => {
  // creating an instance of a recipe with req.body,
  // which is the object comming from the form
  const recipe = new Recipe(req.body);

  recipe
    .save()
    .then((result) => {
      res.redirect("/community");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/community/create", (req, res) => {
  res.render("create");
});

app.get("/community/:id", (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      console.log(result);
      res.render("preparation", { recipeFromDB: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// This handler cannot send a redirect as a response, it can send json
// or text data back to the broser
app.delete("/community/:id", (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/community" });
    })
    .catch((err) => {
      console.log(err);
    });
});

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
