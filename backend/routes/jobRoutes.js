const express = require('express');
const Job = require('../models/Job');
const Application = require('../models/Application');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all job listings
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/jobs/apply
// @desc    Apply to a job (requires authentication)
// @access  Private
router.post('/apply', authMiddleware, async (req, res, next) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'jobId is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Optional: prevent duplicate applications from same user
    const existingApplication = await Application.findOne({
      userId: req.user._id,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    await Application.create({
      userId: req.user._id,
      jobId,
    });

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

