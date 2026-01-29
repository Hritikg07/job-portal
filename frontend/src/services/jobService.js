import api from './api';

export const fetchJobs = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const applyToJob = async (jobId) => {
  const response = await api.post('/jobs/apply', { jobId });
  return response.data;
};

