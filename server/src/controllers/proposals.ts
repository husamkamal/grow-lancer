import { Request, Response } from 'express';
import { FreelancerInstance, ProposalInstance } from '../interfaces';
import {
  Proposal, Job, User, Freelancer, Notification,
} from '../models';
import { editProposalValidation, postProposalValidation } from '../validation';
import { serverErrs } from '../helpers';
import sequelize from '../db/config/connection';
import sendEmail from '../helpers/sendEmail';

const addProposal = async (req: Request, res: Response) => {
  const {
    jobId,
    description,
    attachments,
  } = req.body;
  const freelancerId = res.locals.user.userID;
  await postProposalValidation.validate({
    jobId,
    description,
    attachments,
  });
  const proposalFind = await Proposal.findOne({
    where: {
      freelancerId,
      jobId,
    },
  });
  if (proposalFind) throw serverErrs.BAD_REQUEST('already post a proposal');
  const proposal: ProposalInstance = await Proposal.create({
    jobId,
    freelancerId,
    description,
    attachments,
  });
  return { status: 201, data: proposal };
};

const deletePropsal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID } = res.locals.user;

  const proposal: ProposalInstance | null = await Proposal.findByPk(id);
  if (!proposal) {
    throw serverErrs.BAD_REQUEST('proposal not found');
  } if (proposal.freelancerId !== userID) {
    throw serverErrs.UNAUTHORIZED('unauthorized');
  }
  if (proposal.isAccepted) {
    throw serverErrs.BAD_REQUEST('the job is already accepted');
  }
  await proposal.destroy();
  return { status: 200, msg: 'deleted successfully' };
};

const acceptProposal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID } = res.locals.user;
  const proposal = await Proposal.findByPk(id);
  if (!proposal) throw serverErrs.BAD_REQUEST('Proposal Not Found');
  const { jobId } = proposal;
  const job = await Job.findByPk(jobId);
  if (job?.userId !== userID) throw serverErrs.UNAUTHORIZED('unauthorized');

  await sequelize.transaction(async (t) => {
    await proposal.update({ isAccepted: true }, { transaction: t });
    await Proposal.destroy({ where: { isAccepted: false, jobId }, transaction: t });
    await job?.update({ isOccupied: true }, { transaction: t });
    const description = `Your proposal in ${job?.title} has been Accepted`;
    await Notification.create({ freelancerId: proposal.freelancerId, description });
  });
  interface FreelancerUser extends FreelancerInstance {
    user?: {
      name: string,
      email: string,
    }
  }
  const userInfo: FreelancerUser | null | any = await Freelancer.findOne({
    include: [
      {
        model: User,
        attributes: ['email', 'name', 'id'],
      },
    ],
    where: { id: proposal.freelancerId },
  });
  const jobTitle = job?.title as string;
  if (userInfo?.user) {
    sendEmail(userInfo.user.email, userInfo.user.name, jobTitle);
  }
  return { status: 200, msg: 'Proposal Accepted', data: userInfo };
};

const editProposal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID } = res.locals.user;
  const {
    description,
    attachments,
  } = req.body;
  await editProposalValidation.validate({
    description,
    attachments,
  });
  const proposal = await Proposal.findByPk(id);
  if (!proposal) throw serverErrs.BAD_REQUEST('proposal not found');
  if (proposal?.freelancerId !== userID) throw serverErrs.UNAUTHORIZED('unauthorized');
  if (proposal?.isAccepted) throw serverErrs.BAD_REQUEST('you cant delete it, proposal already accepted');
  const updatedProposal = await Proposal.update(
    {
      description,
      attachments,
    },
    {
      where: {
        id,
      },
    },
  );
  return { status: 200, data: updatedProposal, msg: 'updated' };
};

export {
  addProposal, deletePropsal, acceptProposal, editProposal,
};
