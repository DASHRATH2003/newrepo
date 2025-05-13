const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET all jobs
router.get("/", async (_req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
});

// CREATE a new job
router.post("/", async (req, res) => {
  try {
    const jobData = {
      position: req.body.position,
      experience: req.body.experience,
      jobLocation: req.body.jobLocation,
      driveLocation: req.body.driveLocation || "",
      education: req.body.education,
      category: req.body.category,
      detailsLink: req.body.detailsLink || "", // ✅ Optional new field
    };

    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: "Failed to create job." });
  }
});

// DELETE a job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job." });
  }
});

// UPDATE a job
router.put("/:id", async (req, res) => {
  try {
    const jobData = {
      position: req.body.position,
      experience: req.body.experience,
      jobLocation: req.body.jobLocation,
      driveLocation: req.body.driveLocation || "",
      education: req.body.education,
      category: req.body.category,
      detailsLink: req.body.detailsLink || "", // ✅ Ensure updated link
    };

    const job = await Job.findByIdAndUpdate(req.params.id, jobData, {
      new: true,
    });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: "Failed to update job." });
  }
});

module.exports = router;
