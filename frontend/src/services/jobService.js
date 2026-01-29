import api from './api';

// Fetch all jobs
export const fetchJobs = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

// Fetch job by ID
export const fetchJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Apply to a job (requires auth token)
export const applyToJob = async (jobId) => {
  const response = await api.post('/jobs/apply', { jobId });
  return response.data;
};

