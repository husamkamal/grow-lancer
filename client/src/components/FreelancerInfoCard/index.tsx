import './style.css';
import {
  Button,
  Fab, Grid, TextField,
} from '@mui/material';
import { useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import { FormikProps, useFormik } from 'formik';
import parse from 'html-react-parser';
import avatar from '../../assets/Avatar.png';
import { FreelancerActionsAlerts, FreelancerInfo, HTMLInputEvent } from '../../interfaces';
import { userInfoSchema } from '../../validation';
import { imageUpload, readImage, updateFreelancerData } from '../../helpers';
import TextEditor from '../TextEditor';
import UserContext from '../../context';

interface Props {
  initialValues: FreelancerInfo
  authorize: boolean
  setAlerts: React.Dispatch<React.SetStateAction<FreelancerActionsAlerts | null>>
}
function FreelancerInfoCard({ initialValues, authorize, setAlerts }: Props) {
  const [editable, setEditable] = useState(false);
  const [updatedValues, setUpdatedValues] = useState(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const { user, setUser } = useContext(UserContext);

  function switchSections() {
    setEditable(!editable);
  }

  const formik: FormikProps<FreelancerInfo> = useFormik<FreelancerInfo>({
    initialValues,
    validationSchema: userInfoSchema,
    onSubmit: async (values: FreelancerInfo) => {
      setAlerts(null);
      try {
        if (file) {
          formik.values.image = await imageUpload(file, user?.userID as number);
          setFile(null);
        }
        await updateFreelancerData(values);
        if (user && setUser) setUser({ ...user, name: values.name });
        setUpdatedValues(values);
        setAlerts({ msg: ' Updated Successfully', type: 'success' });
      } catch (err) {
        setAlerts({ msg: 'Something went Wrong, Try Again later!', type: 'error' });
        formik.setValues(updatedValues);
      } finally {
        formik.setSubmitting(false);
        switchSections();
      }
    },
  });
  const formikImageHandler = (s: string) => {
    formik.setFieldValue('image', s);
  };
  const changeHandler = (e: HTMLInputEvent) => {
    if (e.target.files) {
      readImage(e.target.files[0], formikImageHandler);
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className="freelancer-info-card ">
      <Grid
        overflow="hidden"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={{
          sm: 2, md: 2, lg: 2, xl: 0,
        }}
      >
        <Grid xs={10} sm={8} md={6} lg={4} item>
          <div className="freelancer-info-card-img">
            <img src={formik.values.image || avatar} alt="freelancer img" />
            {editable && (
              <div style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto',
              }}
              >
                <label
                  htmlFor="imageUploder"
                  className="UploadImageHolder"
                  onChange={formik.handleChange}
                >
                  <Button
                    variant="contained"
                    component="label"
                    id="upload-new-img-btn"
                    disabled={!!formik.isSubmitting}
                  >
                    <CloudUploadIcon />
                    Upload new image
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      id="uploadeImage"
                      onChange={(e) => changeHandler(e)}
                    />
                    {

                    }
                  </Button>
                </label>
              </div>
            )}
          </div>
        </Grid>
        <Grid xs={10} sm={8} md={6} lg={4} item>
          <div className="freelancer-info-card-content">
            {editable && authorize ? (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  disabled={formik.isSubmitting}
                  name="name"
                  className="freelancer-content-input"
                  id="standard-basic"
                  variant="standard"
                  fullWidth
                  inputProps={{ style: { fontSize: '26px', color: '#1C3879' } }}
                  style={{ marginBottom: '15px' }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  helperText={
                    !!formik.errors.name
                    && formik.errors.name
                  }
                  error={
                    !!(formik.errors.name)
                  }
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <TextField
                    disabled={formik.isSubmitting}
                    name="title"
                    label="title"
                    className="freelancer-content-input"
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    style={{ marginBottom: '15px' }}
                    inputProps={{ style: { fontSize: '16px', color: '#565b5b' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    helperText={
                      !!formik.errors.title
                      && formik.errors.title
                    }
                    error={
                      !!(formik.errors.title)
                    }
                  />
                  <TextField
                    disabled={formik.isSubmitting}
                    name="major"
                    label="major"
                    className="freelancer-content-input"
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    style={{ marginBottom: '15px' }}
                    inputProps={{ style: { fontSize: '16px', color: '#565b5b' } }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.major}
                    helperText={
                      !!formik.errors.major
                      && formik.errors.major
                    }
                    error={
                      !!(formik.errors.major)
                    }
                  />
                </div>
                <TextField
                  disabled={formik.isSubmitting}
                  name="portfolio"
                  label="portfolio"
                  className="freelancer-content-input"
                  id="standard-basic"
                  variant="standard"
                  inputProps={{ style: { fontSize: '16px', color: '#565b5b' } }}
                  fullWidth
                  style={{ marginBottom: '18px' }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.portfolio}
                  helperText={
                    !!formik.errors.portfolio
                    && formik.errors.portfolio
                  }
                  error={
                    !!(formik.errors.portfolio)
                  }
                />
                <TextEditor
                  value={formik.values.brief}
                  setValue={(e) => formik.setFieldValue('brief', e)}
                  error={Boolean(formik.errors.brief)}
                />
                <LoadingButton
                  type="submit"
                  endIcon={<SaveIcon />}
                  loading={formik.isSubmitting}
                  loadingPosition="end"
                  variant="contained"
                  id="card-edit-btn"
                  disabled={JSON.stringify(formik.values) === JSON.stringify(updatedValues) || !formik.isValid}
                  style={{ backgroundColor: '#7B1FA2' }}
                >
                  {formik.isSubmitting ? 'Saving' : 'Save'}
                </LoadingButton>
                <LoadingButton
                  type="button"
                  endIcon={<CloseIcon />}
                  onClick={() => {
                    formik.setValues(updatedValues);
                    switchSections();
                  }}
                  variant="contained"
                  id="card-edit-btn"
                  style={{ backgroundColor: 'red', bottom: '70px', width: '91px' }}
                >
                  Cancel
                </LoadingButton>

              </form>
            ) : (

              <div className="info">
                {authorize && (
                  <Fab
                    color="secondary"
                    id="card-edit-btn"
                    aria-label="edit"
                    onClick={() => switchSections()}
                    style={{ transform: 'scale(.9)' }}
                  >
                    <EditIcon />
                  </Fab>
                )}
                <h3 className="freelancer-name">{formik.values.name}</h3>
                <p className="freelancer-major">
                  <span className="freelancer-title">{formik.values.title}</span>
                  {formik.values.major}
                </p>
                <p className="freelancer-portfolio"><a href={formik.values.portfolio}>Portfolio</a></p>
                <div className="freelancer-brief">{parse(formik.values.brief)}</div>
              </div>
            )}

          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FreelancerInfoCard;
