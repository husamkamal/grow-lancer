import axios from 'axios';
import { FreelancerInfo, ProposalProps } from '../interfaces';

const getJobs = async (url: string, config: any) => {
  const data = await axios.get(url, config);
  return data;
};
const getFreelancerData = async (id: number) => {
  const data = await axios.get(`/api/v1/freelancer/${id}`);
  return data;
};
const updateFreelancerData = async (data: FreelancerInfo) => {
  const res = await axios.put('/api/v1/freelancer', data);
  return res;
};
const destroyProposal = async (id: number) => {
  await axios.delete(`/api/v1/proposals/${id}`);
};
const addProposal = async (
  values: ProposalProps,
  jobId: string | undefined,
) => {
  await axios.post('/api/v1/proposals', { ...values, jobId });
};
const updateProposal = async (
  values: ProposalProps,
  proposalId: number,
) => {
  await axios.put(`/api/v1/proposals/${proposalId}`, values);
};
const login = async (values: {
  email: string
  password: string
}) => {
  const res = await axios.post('api/v1/auth/login', values);
  return res;
};

export {
  getJobs, getFreelancerData, updateFreelancerData, destroyProposal, updateProposal, addProposal, login,
};
