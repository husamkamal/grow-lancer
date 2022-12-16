import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { Model, Optional } from 'sequelize';

// User interFace
interface UserAttributes {
  id: number
  email: string
  name: string
  password: string
  role: string
}
type UserCreationAttributes = Optional<UserAttributes, 'id'>;
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// freelancer interFace
interface FreelancerAttributes {
  id: number
  image?: string
  title: string
  major: string
  brief?: string
  portfolio?: string
  userId: number
}
type FreelancerCreationAttributes = Optional<FreelancerAttributes, 'id'>;
interface FreelancerInstance
  extends Model<FreelancerAttributes, FreelancerCreationAttributes>,
  FreelancerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

interface NotificationAttributes {
  id: number,
  description: string,
  seen: boolean,
  freelancerId: number
}
type NotificationCreationAttributes = Optional<NotificationAttributes, 'id' | 'seen'>;
interface NotificationInstance
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  , NotificationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// Job interface
interface JobAttributes {
  id: number
  title: string
  description: string
  category: string
  budget: number
  time: string
  isOccupied: boolean
  userId: number
}
type JobCreationAttributes = Optional<JobAttributes, 'id' | 'isOccupied'>;
interface JobInstance
  extends Model<JobAttributes, JobCreationAttributes>,
  JobAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// Proposal interface
interface ProposalAttributes {
  id: number
  description: string
  attachments: string
  isAccepted: boolean
  freelancerId: number
  jobId: number
}
type ProposalCreationAttributes = Optional<ProposalAttributes, 'id' | 'isAccepted'>;
interface ProposalInstance
  extends Model<ProposalAttributes, ProposalCreationAttributes>,
  ProposalAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
interface Payload {
  userID: number,
  role: string,
  name: string
}

interface FreelancerWithProposalsAttr extends FreelancerAttributes {
  proposals?: any
}
type FreelancerWithProposalsCreationAttributes = Optional<FreelancerWithProposalsAttr, 'id'>;
interface FreelancerWithProposalsInstance
  extends Model<FreelancerWithProposalsAttr, FreelancerWithProposalsCreationAttributes>,
  FreelancerWithProposalsCreationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// controller types
type ControllerReturn = {
  status: number;
  data?: any;
  msg?: string;

};
type ControllerFunction =
  (req: Request, res: Response, next: NextFunction) => Promise<ControllerReturn>;

interface SocketProps {
  clientName: string,
  receiverId: number,
  jobTitle: string,
  jobId: number
}
export {
  ControllerFunction,
  ControllerReturn,
  FreelancerInstance,
  FreelancerCreationAttributes,
  JobInstance,
  JobCreationAttributes,
  ProposalInstance,
  ProposalCreationAttributes,
  UserInstance,
  UserCreationAttributes,
  FreelancerAttributes,
  FreelancerWithProposalsInstance,
  Payload,
  SocketProps,
  NotificationInstance,

};
