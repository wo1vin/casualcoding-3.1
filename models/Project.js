const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectOwner: { type: String, unique: true },
    datePosted: { type: Date, default: Date.now },

    // better way to reflect this? maybe keywords ex: not started / started / completed
    percentDone: { type: String }
});

module.exports = mongoose.model("Project", ProjectSchema);