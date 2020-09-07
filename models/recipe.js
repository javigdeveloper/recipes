// The name of the actual file (recipe.js) can be capital or not
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    nameOfRecipe: {
      type: String,
      required: true,
    },
    mainIngredient: {
      type: String,
      required: true,
    },
    preparation: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
    },
    like: {
      type: Number,
    },
    dislike: {
      type: Number,
    },
  },
  { timestamps: true }
);

// in mongoose.model("HERE"), we pass the  the singular of the name we gave
// to the collection in the database, and it seems that it doesn't matter if
// it is capitalized or not; so, I could have written:
// mongoose.model("recipe", recipeSchema)

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
