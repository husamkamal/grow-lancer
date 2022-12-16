import * as yup from 'yup';

const queryValidation = yup.object().shape({
  title: yup.string(),
  budget: yup.number(),
  page: yup.number(),
});

const queryJobValidation = yup.object().shape({
  id: yup.number(),
});
const postProposalValidation = yup.object().shape({
  jobId: yup.number().required(),
  description: yup.string().required().min(15),
  attachments: yup.string().nullable().url(),
});
const editProposalValidation = yup.object().shape({
  description: yup.string().min(15),
  attachments: yup.string().nullable().url(),
});
const addJobValidation = yup.object().shape({
  title: yup.string().required(),
  budget: yup.number().required(),
  time: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
});
const loginValidation = yup.object().shape({
  password: yup.string().required().min(8),
  email: yup.string().required().email(),
});

const updateFreelancerValidation = yup.object().shape({
  id: yup.number().notRequired().test('id', 'Updating id is not allowed', (value) => {
    if (value) {
      return false;
    }
    return true;
  }),
  userId: yup.number().notRequired().test('userId', 'Updating userId is not allowed', (value) => {
    if (value) {
      return false;
    }
    return true;
  }),
  createdAt: yup.number().notRequired().test('createdAt', 'Updating createdAt is not allowed', (value) => {
    if (value) {
      return false;
    }
    return true;
  }),
  updatedAt: yup.number().notRequired().test('updatedAt', 'Updating updatedAt is not allowed', (value) => {
    if (value) {
      return false;
    }
    return true;
  }),
  proposals: yup.number().notRequired().test('proposals', 'Updating proposals is not allowed', (value) => {
    if (value) {
      return false;
    }
    return true;
  }),
  name: yup.string()
    .optional()
    .min(1, 'name must not be Empty'),
  major: yup.string()
    .optional()
    .min(1, 'major must not be Empty'),
  title: yup.string()
    .optional()
    .min(1, 'title must not be Empty'),
  portfolio: yup.string()
    .nullable()
    .optional(),
});
const freelancerValidate = yup.object().shape({
  title: yup
    .string()
    .required('Title is required'),
  major: yup
    .string()
    .required('Major is required'),
  portfolio: yup
    .string()
    .optional()
    .nullable()
    .url(),
  brief: yup
    .string()
    .optional()
    .default(''),
  image: yup
    .string()
    .optional()
    .nullable()
    .url(),
});

const signupUserValidation = yup.object().shape({
  role: yup.string().oneOf(['client', 'freelancer'])
    .required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export {
  queryValidation,
  queryJobValidation,
  postProposalValidation,
  addJobValidation,
  updateFreelancerValidation,
  editProposalValidation,
  loginValidation,
  signupUserValidation,
  freelancerValidate,
};
