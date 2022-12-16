import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import './style.css';
import {
  Client, FreelancerActionsAlerts, JobAboutPage, ProposalProps,
} from '../../interfaces';
import { JobDetails, ProposalForm } from '../../components';
import { addProposal } from '../../helpers';

function Job() {
  const { id } = useParams();
  const [jobState, setJob] = useState<JobAboutPage>({
    time: '',
    title: '',
    description: '',
    category: '',
    budget: 0,
    user: {
      name: '', userID: 0, role: '',
    },
  });
  const [client, setClient] = useState<Client>({
    name: '', email: '', id: 0, role: '',
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<FreelancerActionsAlerts | null>(null);
  const onSubmit = async (values: ProposalProps) => {
    setAlert(null);
    try {
      await addProposal(values, id);
      setAlert({ type: 'success', msg: 'Proposal Added Successfully' });
    } catch (err: any) {
      if (err.response.data.message === 'already post a proposal') {
        setAlert({ type: 'error', msg: 'you already add a proposal, go to your profile to edit it' });
      } else {
        setAlert({ type: 'error', msg: 'Something went wrong' });
      }
    }
  };
  useEffect(() => {
    const getJobData = async () => {
      setLoading(true);
      setError(false);
      try {
        const jobData = await axios.get(`/api/v1/jobs/${id}`);
        setLoading(false);
        setJob(jobData.data.data);
        setClient(jobData.data.data.user);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    getJobData();
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <CircularProgress color="inherit" />
        {' '}
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="error-not-found">Job Not Found</h2>
    );
  }

  return (
    <div className="container holders">
      <JobDetails job={jobState} client={client} />
      <ProposalForm onSubmit={onSubmit} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!alert}
        onClose={() => setAlert(null)}
        autoHideDuration={6000}
      >
        <Alert severity={alert?.type}>
          {alert?.msg}
        </Alert>
      </Snackbar>

    </div>

  );
}
export default Job;
