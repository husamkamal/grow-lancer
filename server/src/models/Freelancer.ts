import { DataTypes } from 'sequelize';
import sequelize from '../db/config/connection';
import { FreelancerInstance } from '../interfaces';

const Freelancer = sequelize.define<FreelancerInstance>('freelancer', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  image: {
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  major: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brief: {
    type: DataTypes.TEXT,
  },
  portfolio: {
    type: DataTypes.TEXT,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export default Freelancer;
