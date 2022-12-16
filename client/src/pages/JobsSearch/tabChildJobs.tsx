import { useNavigate } from 'react-router-dom';
import {
  CircularProgress, Button,
} from '@mui/material';
import {
  JobSearch, User,
} from '../../interfaces';
import { JobCard } from '../../components';

interface ChildJobProps {
  loading: boolean,
  jobs: JobSearch[],
  user: User | null | undefined

}
function TabChildJobs(props: ChildJobProps) {
  const { loading, jobs, user } = props;
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="spinner">
        <CircularProgress color="inherit" />
        {' '}
      </div>
    );
  } if (!jobs.length) {
    return <h2>No results found</h2>;
  }
  return (
    <>
      {jobs.map((job: JobSearch) => (
        <JobCard job={job} key={job.title}>

          <div className="budget-proposal-section">
            <div className="proposals">
              proposals:
              <span>
                {' '}
                {job.proposals.length}
              </span>
            </div>
            <div className="budget">
              budget:
              <span>
                $
                {job.budget}
              </span>
            </div>
            {user?.role !== 'client' && (
            <Button
              style={{
                fontSize: '12px',
                borderRadius: '20px',
                paddingLeft: '15px',
                paddingRight: '15px',
              }}
              onClick={() => navigate(`/job/${job.id}`)}
              variant="contained"
            >
              Apply Now
            </Button>
            )}

          </div>

        </JobCard>
      ))}
    </>
  );
}

export default TabChildJobs;
