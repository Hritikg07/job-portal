// Simple script to seed sample job data into MongoDB
// Run with: npm run seed

require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const connectDB = require('../config/db');

const seedJobs = async () => {
  try {
    await connectDB();

    // Clear existing jobs (optional, but useful for development)
    await Job.deleteMany({});

    const jobs = [
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'Build and maintain modern React.js web applications.',
      },
      {
        title: 'Backend Developer',
        company: 'Code Solutions',
        location: 'New York, USA',
        description: 'Design REST APIs with Node.js and Express and work with MongoDB.',
      },
      {
        title: 'Full Stack Engineer',
        company: 'Startup Labs',
        location: 'San Francisco, USA',
        description: 'Work on both frontend and backend of a SaaS product.',
      },
    ];

    await Job.insertMany(jobs);

    console.log('Sample jobs seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
};

seedJobs();

