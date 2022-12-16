import { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Alert, InputLabel, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {
  getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { loginSchema } from '../../validation';
import formImg from '../../assets/4957136 1.png';
import './style.css';
import { login } from '../../helpers';
import UserContext from '../../context';
import { OauthLoginBtn } from '../../components';

function Login() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError(false);
      try {
        const { data } = await login(values);
        formik.resetForm();
        if (setUser) setUser(data.data);
      } catch (err) {
        setError(true);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  const logInWithGoogle = async () => {
    const auth = getAuth();
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const { email, uid } = res.user;
    try {
      if (email && uid) {
        const { data } = await login({ email, password: uid });
        if (setUser) setUser(data.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(true);
    }
  };
  const LoginWithGithub = async () => {
    const auth = getAuth();
    try {
      const res = await signInWithPopup(auth, new GithubAuthProvider());
      const { uid, providerData } = res.user;
      const { email } = providerData[0];
      if (email && uid) {
        const { data } = await login({ email, password: uid });
        if (setUser) setUser(data.data);
      } else {
        throw new Error();
      }
    } catch (err: any) {
      setError(true);
    }
  };
  return (
    <div className="login">
      <div className="form-img">
        <img src={formImg} alt="login img" />
      </div>
      <form className="form-login" onSubmit={formik.handleSubmit}>
        <h2 className="title-login">Welcome to Glancer</h2>
        <div className="oauth-login-btns">
          <OauthLoginBtn label="Login" type="google" onClick={logInWithGoogle} />
          <OauthLoginBtn label="Login" type="github" onClick={LoginWithGithub} />
        </div>
        <div className="form-email">
          <InputLabel className="title-input">Email</InputLabel>
          <TextField
            className="input-login"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email ? formik.errors.email : ' '}
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <div className="form-password">
          <InputLabel className="title-input">Password</InputLabel>
          <TextField
            id="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password ? formik.errors.password : ' '}
            name="password"
            type="password"
            className="input-login"
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <div className="form-bottom">
          <LoadingButton
            id="submit"
            type="submit"
            loadingPosition="start"
            loading={formik.isSubmitting}
            variant="outlined"
            className="btn-login"
          >
            Sign In
          </LoadingButton>
          <span>
            Dont have an account?
            <Link to="/signup" className="link-signup"> Sign Up</Link>
          </span>
        </div>

      </form>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Wrong Email or Password !
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
