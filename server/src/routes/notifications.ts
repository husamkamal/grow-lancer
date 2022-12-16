import express from 'express';
import { getNotifications, updateNotifications } from '../controllers';
import ExpressWrapper from '../ExpressWrapper';
import { passportAuthenticate } from '../middlewares/auth';

const notificationsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
notificationsRouter.get('/', passportAuthenticate, ExpressWrapper(getNotifications));
notificationsRouter.put('/', passportAuthenticate, ExpressWrapper(updateNotifications));

export default notificationsRouter;
