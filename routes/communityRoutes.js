const express = require("express");
const Recipe = require("../models/recipe");
const router = express.Router();

// recipe routes
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("community", { communityRecipes: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
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

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/community" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
