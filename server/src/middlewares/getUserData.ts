import { Request, Response } from 'express';
import { Freelancer } from '../models';

const getUserData = async (req: Request, res: Response) => {
  const { user } = res.locals;
  if (user.role === 'freelancer') {
    const major = await Freelancer.findOne({
      attributes: ['major'],
      where: { id: user.userID },
    });
    return { status: 200, data: { ...user, major } };
  }
  return { status: 200, data: user };
};

export default getUserData;
