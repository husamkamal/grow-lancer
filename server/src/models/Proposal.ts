import DataTypes from 'sequelize';
import sequelize from '../db/config/connection';
import { ProposalInstance } from '../interfaces';

const Proposal = sequelize.define<ProposalInstance>('proposal', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  jobId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  freelancerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

});

export default Proposal;
