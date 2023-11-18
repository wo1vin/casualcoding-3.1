const Project = require("../models/Project");
const User = require("../models/User");

module.exports = {
//   getProfile: async (req, res) => {
//     try {
//       const projects = await Project.find({ user: req.user.id });
//       res.render("profile.ejs", { projects: projects, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
  getFeed: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { projects: projects });
    } catch (err) {
      console.log(err);
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      const author = await User.findById(project.user);

      res.render("project.ejs", { project: project, author: author, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      await Project.create({
        title: req.body.title,
        description: req.body.description,
        datePosted: req.body.datePosted,
        projectOwner: req.user.id,
      });
      console.log("Project has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteProject: async (req, res) => {
    try {
      // Find project by id
      let project = await Project.findById({ _id: req.params.id });
      // Delete project from db
      await Project.deleteOne({ _id: req.params.id });
      console.log("Deleted Project");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};