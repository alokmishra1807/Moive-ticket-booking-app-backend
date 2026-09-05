import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';
import Screen from './screen';


class Seat extends Model<
  InferAttributes<Seat>,
  InferCreationAttributes<Seat>
> {
  declare id: CreationOptional<number>;
  declare screenId: number;
  declare rowName: string;
  declare seatNumber: number;
  declare seatType: 'NORMAL' | 'PREMIUM' | 'RECLINER';
  declare isActive: boolean;

    declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
}

Seat.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    screenId: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: Screen,
        key: 'id',
      },
    },
    rowName: {
      type: 'STRING',
      allowNull: false,
    },
    seatNumber: {
      type: 'INTEGER',
      allowNull: false,
    },
    seatType: {
      type: 'ENUM("NORMAL","PREMIUM","RECLINER")',
      defaultValue: 'NORMAL',
    },
    isActive: {
      type: 'BOOLEAN',
      defaultValue: true,
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
    tableName: 'seats',
    timestamps: true,
    underscored: true,
    paranoid:true, //paranoid is a Sequelize feature that enables soft deletes.
    
  }
);

export default Seat;