import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchJobById } from '../services/jobService';
import { getToken } from '../services/authService';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleApplyClick = () => {
    const token = getToken();
    if (!token) {
      navigate('/login', { state: { from: { pathname: `/jobs/${id}/apply` } } });
    } else {
      navigate(`/jobs/${id}/apply`);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (error) {
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
      <div className="job-detail-card">
        <h2>{job.title}</h2>
        <p className="job-company">{job.company}</p>
        <p className="job-location">{job.location}</p>
        <p className="job-description-full">{job.description}</p>

        <div className="job-detail-actions">
          <button className="btn btn-primary" onClick={handleApplyClick}>
            Apply for this job
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;

