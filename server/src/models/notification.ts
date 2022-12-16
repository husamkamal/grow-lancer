import { DataTypes } from 'sequelize';
import sequelize from '../db/config/connection';
import { NotificationInstance } from '../interfaces';

const Notification = sequelize.define<NotificationInstance>('notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  freelancerId: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },

});

export default Notification;
