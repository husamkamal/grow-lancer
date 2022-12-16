import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal,
} from '@mui/material';
import { useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import parse from 'html-react-parser';
import { UserContext } from '../../context/User';
import { ProposalProps, PropsProposalCard } from '../../interfaces';
import './style.css';
import ProposalForm from '../ProposalForm';
// import ProposalForm from '../ProposalForm';

function ProposalJob({
  proposal,
  onUpdate,
  onDelete,
  acceptProposal,
}: PropsProposalCard) {
  const { user } = useContext(UserContext);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  return (
    <>
      <div className="wrapper-proposal ">
        <div className="content-proposal">
          {user?.role === 'client' ? (
            <h3>
              <Link to={`/freelancer/${proposal.freelancerId}`}>{proposal.freelancer?.user.name}</Link>
            </h3>
          ) : (
            <h3>
              <Link to={`/job/${proposal.jobId}`}>{proposal.job?.title}</Link>
            </h3>
          )}
          <div className="btn-proposal">
            {(user?.role === 'client' && !proposal.isAccepted) ? (
              <Button
                style={{
                  fontSize: '10px',
                  borderRadius: '20px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  backgroundColor: '#1C7925',
                  color: '#fff',
                }}
                onClick={() => {
                  if (acceptProposal) acceptProposal(proposal.id, proposal.jobId);
                }}
              >
                Accept
              </Button>
            ) : (
              !proposal.isAccepted && (
                <div className="freelancer-prop-btns">
                  <IconButton
                    aria-label="edit"
                    onClick={() => setUpdateModal(true)}
                  >
                    <EditIcon htmlColor="#1C7925" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => setConfirmDeleteModal(true)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              )
            )}
          </div>
        </div>
        <div>{parse(proposal.description)}</div>
        {proposal.attachments && (
          <div>
            <a className="link-attach" href={proposal.attachments}>
              See Attachements
            </a>
          </div>
        )}
        <div className="prop-date">
          {new Date(proposal.createdAt).toLocaleString()}
          <CalendarMonthIcon />
        </div>
      </div>
      {updateModal && (
        <div className="update-proposal-modal">
          <Modal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => setUpdateModal(false)}
          >
            <div id="edit-form-model">
              <ProposalForm
                onSubmit={(values: ProposalProps) => {
                  if (onUpdate) onUpdate(values);
                  setUpdateModal(false);
                }}
                initialValue={{
                  description: proposal.description,
                  attachments: proposal.attachments,
                  id: proposal.id,
                }}
              />
            </div>
          </Modal>
        </div>
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
                onClick={onDelete}
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
    </>
  );
}

export default ProposalJob;
