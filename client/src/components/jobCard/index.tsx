import {
  Typography,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';
import { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import parse from 'html-react-parser';
import { JobPropsCard } from '../../interfaces';
import UserContext from '../../context';

function JobCard({
  job, children, handlerDeleted,
}: JobPropsCard) {
  const {
    title, description, id,
  } = job;

  const { user } = useContext(UserContext);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);

  return (
    <div className="content">
      <div className="job-card">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link to={`/job/${job.id}`} className="link-description">
            <Typography
              variant="h5"
              gutterBottom
              color="primary"
            >
              {title}
            </Typography>
          </Link>
          {handlerDeleted && user?.userID === job.userId && job.isOccupied === false && (
            <IconButton
              aria-label="delete"
              onClick={() => setConfirmDeleteModal(true)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {confirmDeleteModal && (
          <div className="confirm-delete-modal">
            <Dialog open>
              <DialogTitle id="alert-dialog-title">
                Are You Sure?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You will not be able to restore this proposal!
                  And it will be deleted from the client proposals list
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  aria-label="delete"
                  color="warning"
                  onClick={() => { if (handlerDeleted) handlerDeleted(id); }}
                >
                  Delete
                </Button>
                <Button
                  aria-label="cancel"
                  color="info"
                  onClick={() => setConfirmDeleteModal(false)}
                >
                  Keep
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          )}
        </div>
        <div className="description">
          <div>{parse(description)}</div>
        </div>
        <div className="second-section">
          {children}
        </div>
      </div>
    </div>

  );
}

export default JobCard;
