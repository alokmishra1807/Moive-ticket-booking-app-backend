import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare casts: string[];
  declare genres:string[];
  declare trailerUrl: string;
  declare language: string;
  declare releaseDate: string;
  declare director: string;
  declare releaseStatus: string;
 
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Movie.init(
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
    description: {
      type: 'TEXT',
      allowNull: false,
    },
    casts: {
      type: 'JSON',
      allowNull: false,
    },
     genres: {
      type: 'JSON',
      allowNull: false,
    },
    trailerUrl: {
      type: 'STRING',
      allowNull: false,
    },
    language: {
      type: 'STRING',
      allowNull: false,
      defaultValue: 'English',
    },
    releaseDate: {
      type: 'DATEONLY',
      allowNull: false,
    },
    director: {
      type: 'STRING',
      allowNull: false,
    },
    releaseStatus: {
      type: 'STRING',
      allowNull: false,
      defaultValue: 'RELEASED',
    },
    createdAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    updatedAt: {
      type: 'DATE',
      defaultValue: new Date(),
    },
  },
  {
    tableName: 'movies',
    sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default Movie;