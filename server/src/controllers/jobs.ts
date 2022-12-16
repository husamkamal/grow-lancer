import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { serverErrs } from '../helpers';
import { JobInstance } from '../interfaces';
import { Job, Proposal, User } from '../models';
import { queryJobValidation, addJobValidation, queryValidation } from '../validation';

const getJob = async (req: Request) => {
  const { id } = req.params;
  await queryJobValidation.validate(req.params);
  const job = await Job.findByPk(id, {
    include: {
      model: User,
      attributes: [
        'id',
        'email',
        'name',
        'role',
      ],
    },
  });
  if (!job) return { status: 200, msg: 'job not found' };
  return { status: 200, data: job };
};
const addJob = async (req: Request, res: Response) => {
  const {
    title,
    budget,
    time,
    category,
    description,
  } = req.body;
  const userId = res.locals.user.userID;

  await addJobValidation.validate({
    title,
    description,
    category,
    budget,
    time,
  });
  const job = await Job.create({
    title,
    description,
    category,
    budget,
    time,
    userId,
  });
  return { status: 201, data: job };
};
const searchJobs = async (req: Request) => {
  const JOBS_PER_PAGE = 5;
  const {
    title, page = 1, budget, category,
  } = req.query;

  await queryValidation.validate(req.query);
  const where: WhereOptions<any> | undefined = { isOccupied: false };
  if (title) {
    where[Op.or as any] = [
      {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      {
        description: {
          [Op.iLike]: `%${title}%`,
        },
      },
    ];
  }
  if (budget) {
    where.budget = {
      [Op.gte]: budget,
    };
  }

  if (category) {
    where.category = category;
  }

  const jobs = await Job.findAndCountAll({
    attributes: [
      'id',
      'title',
      'description',
      'category',
      'budget',
      'isOccupied',
      'userId',
    ],
    where,
    include: [
      {
        model: Proposal,
        attributes: { include: ['jobId'] },
      },
    ],
    order: [['id', 'DESC']],
    distinct: true,
    limit: JOBS_PER_PAGE,
    offset: (Number(page) - 1) * JOBS_PER_PAGE,
  });
  return { status: 200, data: jobs };
};
const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID } = res.locals.user;
  await queryJobValidation.validate(req.params);
  const job: JobInstance | null = await Job.findByPk(id);
  if (!job) {
    throw serverErrs.BAD_REQUEST('job not found');
  }
  if (userID === job.userId) {
    if (job.isOccupied) {
      throw serverErrs.BAD_REQUEST('job is Occupied');
    }
    await job.destroy();
    return { status: 200, msg: 'Job deleted' };
  }

  throw serverErrs.UNAUTHORIZED('you are not authorized');
};
export {
  addJob,
  getJob,
  searchJobs,
  deleteJob,
};
