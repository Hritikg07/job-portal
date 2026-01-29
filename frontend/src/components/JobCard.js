import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-description">
        {job.description.length > 120
          ? `${job.description.substring(0, 120)}...`
          : job.description}
      </p>
      <Link to={`/jobs/${job._id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;

