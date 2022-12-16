import User from './User';
import Proposal from './Proposal';
import Job from './Job';
import Freelancer from './Freelancer';
import Notification from './notification';

Freelancer.hasMany(Proposal);
Freelancer.belongsTo(User);
User.hasOne(Freelancer);
Proposal.belongsTo(Freelancer);
Proposal.belongsTo(Job);
Job.hasMany(Proposal, { onDelete: 'cascade', hooks: true });
User.hasMany(Job);
Job.belongsTo(User);
Freelancer.hasMany(Notification);
Notification.belongsTo(Freelancer);

export {
  User, Proposal, Job, Freelancer, Notification,
};
