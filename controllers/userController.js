const User = require("../models/user");
const jwt = require("jsonwebtoken");

// handling errors:
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email:
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password:
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate email error code:
  if (err.code === 11000) {
    errors.email = "That email already exists";
    return errors;
  }

  // validation errors:
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const create_user_get = (req, res) => {
  res.render("register");
};

const create_user_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  // creating an instance of a user with req.body,
  // which is the object comming from the form
  // const user = new User(req.body);
  // user
  //   .save()
  //   .then((result) => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const login_user_get = async (req, res) => {
  res.render("login");
};

const login_user_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_user_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
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
  login_user_get,
  login_user_post,
  logout_user_get,
};
