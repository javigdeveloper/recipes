const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const communityRoutes = require("./routes/communityRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
// const { response } = require("express");
// const { render } = require("ejs");
require("dotenv").config();

const app = express();

// connecting to mongoDB:
let mongoDB = `mongodb+srv://javigdeveloper:${process.env.MONGO_PASSWORD}@recipesdb.pezey.gcp.mongodb.net/recipetest?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine:
app.set("view engine", "ejs");

// middleware & static files:
app.use(express.static("public"));
// next line takes any json data that comes along with a request
// and parses it into a javascript object
app.use(express.json());
// for submitted form from ejs file to make it a workable format:
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  // res.render("index", { data });
  res.render("index");
});

app.use("/community", communityRoutes);

// user routes
app.use(userRoutes);

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

// cookies:
// app.get("/set-cookies", (req, res) => {
// method used without cookie-parser is:
// res.setHeader("set-Cookie", "newUser=true");
//   res.cookie("newUser", false, { maxAge: 1000 * 60, httpOnly: true });
//   res.send("you got the cookie");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });

// not found:
app.use((req, res) => {
  res.status(404).render("404");
});
