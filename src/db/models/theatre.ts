import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from './sequelize';



class Theatre extends Model<
  InferAttributes<Theatre>,
  InferCreationAttributes<Theatre>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare city: string;
  declare pin: string;
  declare address: string;
  declare ownerId: number;//hardcoding for now

    declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
   declare screens?: NonAttribute<any[]>;
}




Theatre.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: 'STRING',
      allowNull: false,
    },
    city: {
      type: 'STRING',
      allowNull: false,
    },
    pin: {
      type: 'STRING',
      allowNull: false,
    },
    address: {
      type: 'STRING',
      allowNull: false,
    },
    ownerId: {
      type: 'INTEGER',
      allowNull: false,
      //refernce to be added after user to be created
    },
    createdAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    updatedAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    deletedAt: {
      type: 'DATE',
      defaultValue: null,
    },
  
  },
  {
    sequelize,
    tableName: 'theatres',
    timestamps: true,
    underscored: true,
    paranoid:true,
    
  }
);

export default Theatre;