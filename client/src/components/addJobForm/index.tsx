import { useFormik } from 'formik';
import {
  TextField, InputLabel, FormControl, Select, MenuItem, FormHelperText, Button, Modal, Stack, Snackbar, Alert,
} from '@mui/material';
import './style.css';
import axios from 'axios';
import { useState } from 'react';
import TextEditor from '../TextEditor';
import data from '../../categoris';
import { JobProps, MessageAlert } from '../../interfaces';
import { jobSchema } from '../../validation';

interface ProposalProps {
  proposals: [],
}

function JobForm({
  handelClose, showModel, jobsUnoccupied, setJobsUnoccupied,
}: JobProps) {
  const [error, setError] = useState<MessageAlert>({
    type: 'error',
    value: 'Something went Wrong, Try Again later!',
    open: false,
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      budget: '',
      time: '',
      category: '',
      description: '',
    },
    validationSchema: jobSchema,
    onSubmit: async (values) => {
      try {
        const job = await axios.post(
          'api/v1/jobs',
          values,
        );
        const newJob = job.data.data;
        const proposals: ProposalProps | [] = [];
        newJob.proposals = proposals;
        setJobsUnoccupied([...jobsUnoccupied, newJob]);
        formik.resetForm();
        handelClose();
      } catch (err) {
        setError({ ...error, open: true });
      }
    },
  });
  return (
    <>
      <Modal
        open={showModel}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit} className="job-from">
          <div className="text-fileds">
            <TextField
              className="text-filed"
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.errors.title ? formik.errors.title : ' '}
              label="Job Title"
              name="title"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <TextField
              className="text-filed"
              error={formik.touched.budget && Boolean(formik.errors.budget)}
              helperText={formik.errors.budget ? formik.errors.budget : ' '}
              label="Budget"
              type="number"
              name="budget"
              id="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
            />
            <TextField
              className="text-filed"
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={formik.errors.time ? formik.errors.time : ' '}
              label="Time"
              name="time"
              id="time"
              value={formik.values.time}
              onChange={formik.handleChange}
            />
            <FormControl style={{ color: '#D32F2F' }} className="text-filed">
              <InputLabel>Category</InputLabel>
              <Select
                className="text-select"
                error={formik.touched.category && Boolean(formik.errors.category)}
                label="Category"
                name="category"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {data.map((ele) => <MenuItem key={ele.name} value={ele.name}>{ele.name}</MenuItem>)}
              </Select>
              <FormHelperText style={{ color: '#D32F2F' }}>
                {formik.errors.category ? formik.errors.category : ' '}
              </FormHelperText>
            </FormControl>

          </div>
          <div>
            <InputLabel>description</InputLabel>
            <TextEditor
              error={Boolean(formik.errors.description)}
              value={formik.values.description}
              setValue={(e) => formik.setFieldValue('description', e)}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            style={{ width: '30%', margin: '0 auto', marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
      </Modal>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error.open}
          onClose={() => setError({ ...error, open: false })}
          autoHideDuration={6000}
        >
          <Alert severity={error.type}>
            {error.value}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default JobForm;
