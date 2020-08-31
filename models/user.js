const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// it would work like this too but typically the names of the models are capitalized
// const User = mongoose.model("user", userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
