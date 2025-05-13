const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  position: String,
  experience: String,
  jobLocation: String,
  driveLocation: String,
  education: String,
  category: String,
  detailsLink: String, // ✅ new field
});

module.exports = mongoose.model("Job", jobSchema);
