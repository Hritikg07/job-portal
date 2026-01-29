import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import { fetchJobs } from '../services/jobService';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load jobs.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="page">
      <h2>Available Jobs</h2>
      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && jobs.length === 0 && <p>No jobs available.</p>}
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListPage;

