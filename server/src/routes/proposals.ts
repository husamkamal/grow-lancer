import express from 'express';
import {
  addProposal, deletePropsal, acceptProposal, editProposal,
} from '../controllers';
import ExpressWrapper from '../ExpressWrapper';
import { checkUserAuth, passportAuthenticate } from '../middlewares/auth';

const proposalsRouter = express.Router();
proposalsRouter.use(passportAuthenticate);
proposalsRouter.patch('/:id', checkUserAuth('client'), ExpressWrapper(acceptProposal));

proposalsRouter.use(checkUserAuth('freelancer'));
proposalsRouter.post('/', ExpressWrapper(addProposal));
proposalsRouter.delete('/:id', ExpressWrapper(deletePropsal));
proposalsRouter.put('/:id', ExpressWrapper(editProposal));

export default proposalsRouter;
