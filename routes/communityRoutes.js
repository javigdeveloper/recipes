const express = require("express");
const communityController = require("../controllers/communityController");
const router = express.Router();

// recipe routes
router.get("/", communityController.community_index);
router.post("/", communityController.community_create_post);
router.get("/create", communityController.community_create_get);
router.get("/:id", communityController.community_details);
router.delete("/:id", communityController.community_delete);

module.exports = router;
