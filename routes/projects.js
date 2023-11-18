const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes 
router.get("/:id", ensureAuth, projectsController.getProject);

router.post("/createProject", projectsController.createProject);

// router.put("/likeProject/:id", projectsController.likeProject);

router.delete("/deleteProject/:id", projectsController.deleteProject);

module.exports = router;