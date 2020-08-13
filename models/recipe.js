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
    like: {
      type: Number,
    },
    dislike: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
