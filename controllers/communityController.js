const Recipe = require("../models/recipe");

const community_index = (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("communityRecipes/community", { communityRecipes: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const community_details = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      res.render("communityRecipes/preparation", { recipeFromDB: result });
    })
    .catch((err) => {
      res.status(404).render("404");
    });
};

const community_create_get = (req, res) => {
  res.render("communityRecipes/create");
};

const community_create_post = (req, res) => {
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
};

// This handler cannot send a redirect as a response, it can send json
// or text data back to the broser
const community_delete = (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/community" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  community_index,
  community_details,
  community_create_get,
  community_create_post,
  community_delete,
};
