import sequelize from './connection';
import {
  users, proposals, jobs, freelancers,
} from './fakeData';
import {
  User, Proposal, Job, Freelancer,
} from '../../models/index';

const insertDB = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(users);
  await Job.bulkCreate(jobs);
  await Freelancer.bulkCreate(freelancers);
  await Proposal.bulkCreate(proposals);
};
if (process.env.SEED) {
  insertDB();
}

export default insertDB;
