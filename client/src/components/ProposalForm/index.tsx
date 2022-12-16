import { LoadingButton } from '@mui/lab';
import {
  TextField,
} from '@mui/material';
import {
  FormikProps,
  useFormik,
} from 'formik';
import SendIcon from '@mui/icons-material/Send';
import TextEditor from '../TextEditor';
import './style.css';
import { ProposalFormProps, ProposalProps } from '../../interfaces';
import { ProposalSchema } from '../../validation';

function ProposalForm({
  initialValue, onSubmit,
}: ProposalFormProps) {
  const formik: FormikProps<ProposalProps> = useFormik<ProposalProps>({
    initialValues: initialValue || {
      description: '',
      attachments: '',
    },
    validationSchema: ProposalSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="proposal-form">
        <div className="proposal-text">
          <h2 className="proposal-form-heading">Proposal</h2>
          <TextEditor
            error={!!(formik.errors.description && formik.touched.description)}
            value={formik.values.description}
            setValue={(e) => formik.setFieldValue('description', e)}
          />
          {!!(formik.errors.description
            && formik.touched.description)
            && <small style={{ color: '#d32f2f' }}>{formik.errors.description}</small>}
        </div>
        <div className="proposal-attachment">
          <h2 className="proposal-form-heading">Attachments</h2>
          <TextField
            fullWidth
            name="attachments"
            id="attachments"
            label="Enter Your Attachments link"
            onChange={formik.handleChange}
            variant="outlined"
            onBlur={formik.handleBlur}
            value={formik.values.attachments}
            helperText={
              formik.errors.attachments
                ? formik.errors.attachments
                : 'optional'
            }
            error={
              !!(formik.errors.attachments)
            }
          />
        </div>
        <LoadingButton
          id="submit"
          type="submit"
          endIcon={<SendIcon />}
          loading={formik.isSubmitting}
          loadingPosition="end"
          variant="contained"
          className={formik.isSubmitting ? 'submitProposal loading' : 'submitProposal '}
        >
          {formik.isSubmitting ? 'Sending' : 'Submit'}
        </LoadingButton>
      </div>
    </form>
  );
}
export default ProposalForm;
