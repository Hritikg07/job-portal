import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchJobById, applyToJob } from '../services/jobService';

const ApplyJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load job.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await applyToJob(id);
      setSuccess('Application submitted successfully!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Failed to submit application. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="page">
        <p>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="apply-card">
        <h2>Apply to: {job.title}</h2>
        <p className="job-company">{job.company}</p>
        <p className="job-location">{job.location}</p>
        <p className="job-description-full">{job.description}</p>

        <form onSubmit={handleApply} className="form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Confirm Application'}
          </button>
        </form>

        <Link to={`/jobs/${id}`} className="btn btn-secondary apply-back">
          Back to Job Details
        </Link>
      </div>
    </div>
  );
};

export default ApplyJobPage;

