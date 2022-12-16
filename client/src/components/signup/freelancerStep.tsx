import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Stack, Snackbar, Alert,
} from '@mui/material';
import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import data from '../../categoris';
import { thirdStepValidation } from '../../validation';
import TextEditor from '../TextEditor';
import './style.css';
import UserContext from '../../context';
import { imageUpload, readImage } from '../../helpers';
import { HTMLInputEvent, SignFreelancer } from '../../interfaces';

function FreelancerSignUp({ userInfo }: SignFreelancer) {
  const { userID, name, photoURL } = userInfo;
  const [freelancerError, setFreelancerError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState<string | null>(photoURL);
  const [file, setFile] = useState<File | null>(null);

  const changeHandler = (e: HTMLInputEvent) => {
    if (e.target.files) {
      readImage(e.target.files[0], setImgSrc);
      setFile(e.target.files[0]);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      major: '',
      portfolio: '',
      brief: '',
      image: photoURL,
    },
    validationSchema: thirdStepValidation,
    onSubmit: async (values) => {
      try {
        let avatarURL = null;
        if (file) {
          avatarURL = await imageUpload(file, 2);
        }
        const freelancer = await axios.post('/api/v1/auth/freelancer', {
          title: values.title,
          major: values.major,
          portfolio: values.portfolio,
          brief: values.brief,
          image: avatarURL || values.image,
          userId: userID,
        });
        setFreelancerError(false);
        const freelancerId = freelancer.data.data.id;
        if (setUser) {
          setUser({
            userID: freelancerId, role: 'freelancer', name,
          });
        }
        formik.resetForm();
        setImgSrc(null);
        navigate(`/freelancer/${freelancerId}`);
      } catch (err) {
        setFreelancerError(true);
      }
    },
  });
  return (
    <div className="formDivContainer">
      <form
        className="thirdStepForm"
        onSubmit={formik.handleSubmit}
      >
        <div className="firstPart">

          <TextField
            id="Title"
            name="title"
            label="Enter your title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            style={{ marginBottom: '20px' }}
          />
          <FormControl style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="Major">Major</InputLabel>
            <Select
              id="Major"
              name="major"
              label="major"
              value={formik.values.major}
              onChange={formik.handleChange}
              error={formik.touched.major && Boolean(formik.errors.major)}
            >
              {data.map((ele) => <MenuItem key={ele.name} value={ele.name}>{ele.name}</MenuItem>)}
            </Select>
            <FormHelperText id="error-text" error>
              {formik.touched.major && formik.errors.major}
            </FormHelperText>
          </FormControl>
          <TextField
            id="portfolio"
            name="portfolio"
            label="portfolio"
            value={formik.values.portfolio}
            onChange={formik.handleChange}
            error={formik.touched.portfolio && Boolean(formik.errors.portfolio)}
            helperText={formik.touched.portfolio && formik.errors.portfolio}
            style={{ marginBottom: '20px' }}
          />
          <InputLabel htmlFor="Major">Description</InputLabel>
          <TextEditor
            error={false}
            value={formik.values.brief}
            setValue={(e) => formik.setFieldValue('brief', e)}
          />
        </div>
        <div className="secondPart">
          <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
          >
            <label
              htmlFor="imageUploder"
              className="UploadImageHolder"
              onChange={formik.handleChange}
            >
              <LoadingButton
                variant="contained"
                component="label"
                style={{
                  backgroundColor: '#EFF0F2',
                  color: '#1C3879',
                  height: '60px',
                  // marginBottom: '15px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <CloudUploadIcon />
                Upload image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="uploadeImage"
                  onChange={(e) => changeHandler(e)}
                />
                {

                }
              </LoadingButton>
              <FormHelperText id="error-text" error>
                {formik.touched.image && formik.errors.image}
              </FormHelperText>
            </label>
            {imgSrc && (

              <div style={{
                borderWidth: '1px', borderStyle: 'dashed', borderColor: '#757571', width: '80%', marginBottom: '20px',
              }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  style={{ width: '150px', height: '150px', margin: '20px 0px' }}
                  id="showImage"
                />
              </div>
            )}
          </div>
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            style={{ width: '80%', height: '40px' }}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={freelancerError}
          onClose={() => setFreelancerError(false)}
          autoHideDuration={6000}
        >
          <Alert severity="error">
            Something went Wrong, Try Again later!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
export default FreelancerSignUp;
