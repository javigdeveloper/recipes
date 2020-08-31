const User = require("../models/user");

// const community_index = (req, res) => {
//   User.find()
//     .sort({ createdAt: -1 })
//     .then((result) => {
//       res.render("community", { communityRecipes: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const community_details = (req, res) => {
//   const id = req.params.id;
//   User.findById(id)
//     .then((result) => {
//       res.render("preparation", { recipeFromDB: result });
//     })
//     .catch((err) => {
//       res.status(404).render("404");
//     });
// };

const create_user_get = (req, res) => {
  res.render("register");
};

const create_user_post = (req, res) => {
  // creating an instance of a user with req.body,
  // which is the object comming from the form
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

// This handler cannot send a redirect as a response, it can send json
// or text data back to the broser

// const community_delete = (req, res) => {
//   const id = req.params.id;
//   User.findByIdAndDelete(id)
//     .then((result) => {
//       res.json({ redirect: "/community" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = {
  create_user_get,
  create_user_post,
  //   community_index,
  //   community_details,
  //   community_create_get,
  //   community_create_post,
  //   community_delete,
};
