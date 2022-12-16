import express from 'express';
import ExpressWrapper from '../ExpressWrapper';
import {
  login, signupUser, freelancerSignUp, logout,
} from '../controllers';

const AuthRouter = express.Router();

AuthRouter.post('/login', ExpressWrapper(login));
AuthRouter.post('/signup', ExpressWrapper(signupUser));
AuthRouter.post('/freelancer', ExpressWrapper(freelancerSignUp));
AuthRouter.get('/logout', ExpressWrapper(logout));

export default AuthRouter;
