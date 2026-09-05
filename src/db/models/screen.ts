import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from './sequelize';


class Screen extends Model<
  InferAttributes<Screen>,
  InferCreationAttributes<Screen>
> {
  declare id: CreationOptional<number>;
  declare theatreId: number;
  declare name: string;
  declare totalRows: number;
  declare totalColumns: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;

   declare theatre?: NonAttribute<any[]>;
}



Screen.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    theatreId: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: "theatres",
        key: 'id',
      },
    },
    name: {
      type: 'STRING',
      allowNull: false,
    },
    totalRows: {
      type: 'INTEGER',
      allowNull: false,
    },
    totalColumns: {
      type: 'INTEGER',
      allowNull: false,
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
    tableName: 'screens',
    timestamps: true,
    underscored: true,
    paranoid:true,
  
  }
);

export default Screen;