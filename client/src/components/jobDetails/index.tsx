import { Button } from '@mui/material';
import parse from 'html-react-parser';
import { PropsJobPage } from '../../interfaces';
import './style.css';

function JobDetails({ job, client }: PropsJobPage) {
  return (
    <div className="details">
      <div className="top">
        <h2>{job.title}</h2>
        <p>
          Client:
          <span>
            {client.name}
          </span>
        </p>
      </div>
      <div className="content">
        <p>{parse(job.description)}</p>
        <div className="jobs-details">
          <p>
            category:
            <span>{job.category}</span>
          </p>
          <p>
            duration:
            <span>{job.time}</span>
          </p>
          <p>
            budget:
            <span>
              $
              {job.budget}
            </span>
          </p>
        </div>
        <div className="link-btn">
          <Button
            href="#submit"
            className="button"
            variant="contained"
          >
            Apply Now
          </Button>

        </div>
      </div>
    </div>
  );
}

export default JobDetails;
