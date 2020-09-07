import  Sequelize from 'sequelize';
import db from '../db';
import { Sport } from './sport';

export interface IProfileAttributes {
    id?:number,
    name?: string,
    nationality?: string,
    gender?: string,
    dob?: string,
    sport_id?: number,
    sport_name?: string,
    team?: string,
    association?: string,
    instagram_handle?:string,
    facebook_handle?:string,
    twitter_handle?:string,
    picture?:string,
    description?:string,
    createdAt?: string,
    updatedAt?: string
  }

  export interface IProfileInstance extends Sequelize.Instance<IProfileAttributes> {
    dataValues: IProfileAttributes;
  }
  
  export const Profile = db.define<IProfileInstance, IProfileAttributes>('profile', {
    name: {
        type: Sequelize.STRING,
        validate: {notEmpty: true}
      },
      nationality: {
        type: Sequelize.STRING,
        validate: {notEmpty: true}
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['MALE','FEMALE']
      },
      dob: {
          type: Sequelize.DATEONLY
      },
      sport_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
            model: Sport,
            key: 'id'
        }
      },
      sport_name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.ENUM,
        values: ['KKR','RCB','CSK']
      },
      association : {
          type: Sequelize.ENUM,
          values: ['IPL','ICL', 'PPL']
      },
      instagram_handle: {
        type: Sequelize.TEXT
      },
      facebook_handle: {
        type: Sequelize.TEXT
      },
      twitter_handle: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.TEXT
      },
      description: {
          type: Sequelize.TEXT
      }
  });
  
  Profile.belongsTo(Sport, { foreignKey: 'sport_id' });