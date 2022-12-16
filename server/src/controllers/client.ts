import { Request, Response } from 'express';
import {
  Freelancer, Job, Proposal, User,
} from '../models';

const getClientData = async (req: Request, res: Response) => {
  const id = res.locals.user.userID;
  const clientData = await Job.findAndCountAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: Proposal,

        include: [
          {
            model: Freelancer,
            attributes: [
              'id',
              'userId',
            ],
            include: [
              {
                model: User,
                attributes: [
                  'name',
                ],
              },
            ],
          },
        ],
      },
    ],
    distinct: true,
  });
  const occupiedJobs = [];
  const unOccupiedJobs = [];

  for (let i = 0; i < clientData.rows.length; i += 1) {
    if (clientData.rows[i].isOccupied) {
      occupiedJobs.push(clientData.rows[i]);
    } else {
      unOccupiedJobs.push(clientData.rows[i]);
    }
  }

  return { status: 200, data: { count: clientData.count, occupiedJobs, unOccupiedJobs } };
};

export default getClientData;
