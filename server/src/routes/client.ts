import express from 'express';
import getClientData from '../controllers/client';
import ExpressWrapper from '../ExpressWrapper';

const clientRouter = express.Router();

clientRouter.get('/', ExpressWrapper(getClientData));

export default clientRouter;
