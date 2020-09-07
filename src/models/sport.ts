import  Sequelize from 'sequelize';
import db from '../db';

export interface ISportAttributes {
    id?:number,
    name?: string,
    createdAt?: string,
    updatedAt?: string
  }

  export interface ISportInstance extends Sequelize.Instance<ISportAttributes> {
    dataValues: ISportAttributes;
  }
  
  export const Sport = db.define<ISportInstance, ISportAttributes>('sport', {
    
    name: {
        type: Sequelize.STRING,
        validate: {notEmpty: true}
      }
  });
  
  