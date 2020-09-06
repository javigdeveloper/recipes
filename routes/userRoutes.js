const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// user routes
router.get("/register", userController.create_user_get);
router.post("/register", userController.create_user_post);
router.get("/login", userController.login_user_get);
router.post("/login", userController.login_user_post);
router.get("/logout", userController.logout_user_get);

// router.get("/", communityController.community_index);
// router.post("/", communityController.community_create_post);
// router.get("/create", communityController.community_create_get);
// router.get("/:id", communityController.community_details);
// router.delete("/:id", communityController.community_delete);

module.exports = router;
