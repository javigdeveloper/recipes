const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// user routes
router.get("/", userController.create_user_get);
router.post("/", userController.create_user_post);

// router.get("/", communityController.community_index);
// router.post("/", communityController.community_create_post);
// router.get("/create", communityController.community_create_get);
// router.get("/:id", communityController.community_details);
// router.delete("/:id", communityController.community_delete);

module.exports = router;
