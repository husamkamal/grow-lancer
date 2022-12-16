import { Request, Response } from 'express';
import { Notification } from '../models';

const getNotifications = async (req: Request, res: Response) => {
  const { userID } = res.locals.user;
  const notifications = await Notification.findAll({
    where: {
      freelancerId: userID,
    },
    order: [['id', 'DESC']],
  });
  const unSeenCount = await Notification.count({
    where: {
      seen: false,
      freelancerId: userID,
    },
  });
  return { status: 200, data: { notifications, unSeenCount } };
};
const updateNotifications = async (req: Request, res: Response) => {
  const { userID } = res.locals.user;
  await Notification.update({
    seen: true,
  }, {
    where: {
      freelancerId: userID,
    },
  });
  return { status: 200, msg: 'success' };
};
export { getNotifications, updateNotifications };
