import express from 'express';
import { getFreelancer, updateFreelancerInfo } from '../controllers';
import ExpressWrapper from '../ExpressWrapper';
import { checkUserAuth, passportAuthenticate } from '../middlewares/auth';

const freelancerRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
freelancerRouter.put('/', passportAuthenticate, checkUserAuth('freelancer'), ExpressWrapper(updateFreelancerInfo));
freelancerRouter.get('/:id', passportAuthenticate, ExpressWrapper(getFreelancer));

export default freelancerRouter;
