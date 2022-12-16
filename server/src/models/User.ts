import { DataTypes } from 'sequelize';
import sequelize from '../db/config/connection';
import { UserInstance } from '../interfaces';

const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('freelancer', 'client'),
    allowNull: false,
  },
});

export default User;
