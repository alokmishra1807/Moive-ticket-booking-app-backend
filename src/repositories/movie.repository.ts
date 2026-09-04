import { Op, Order, Sequelize, WhereOptions } from "sequelize";
import logger from "../config/logger.config";
import Movie from "../db/models/movies";
import { CreateMovieDTO, GetMoviesQueryDTO } from "../dto/movie.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function createMovieRepository(movieData: CreateMovieDTO) {
  const movie = await Movie.create({
    name: movieData.name,
    description: movieData.description,
    casts: movieData.casts,
    genres: movieData.genres,
    language: movieData.language || "English",
    trailerUrl: movieData.trailerUrl,
    releaseDate: movieData.releaseDate,
    director: movieData.director,
    releaseStatus: movieData.releaseStatus || "Released",
  });

  logger.info(`Movie created ${movie.id}`);

  return movie;
}

export async function getMovieById(id: number) {
  const movie = await Movie.findByPk(id);

  if (!movie) {
    logger.error(`Movie with ${id} is not available`);
    throw new NotFoundError(`Movie : ${id} not found`);
  }
  logger.info(`Movie : {id} found`);
  return movie;
}

export async function updateMovieById(
  id: number,
  movieData: Partial<CreateMovieDTO>,
) {
  const movie = await Movie.findOne({
    where: {
      id: id,
    },
  });

  if (!movie) {
    logger.error(`Movie with ${id} is not available`);
    throw new NotFoundError(`Movie : ${id} not found`);
  }

  await movie.update({
    name: movieData.name,
    description: movieData.description,
    casts: movieData.casts,
    language: movieData.language || "English",
    trailerUrl: movieData.trailerUrl,
    releaseDate: movieData.releaseDate,
    director: movieData.director,
    releaseStatus: movieData.releaseStatus || "Released",
  });

  logger.info(`Movie created ${movie.id}`);
  return movie;
}

export async function deleteMovieById(id: number) {
  const movie = await Movie.findOne({
    where: {
      id: id,
    },
  });

  if (!movie) {
    logger.error(`Movie with ${id} is not available`);
    throw new NotFoundError(`Movie : ${id} not found`);
  }
  logger.info(`Movie havind id:${movie.id} deleted`);
  await movie.destroy();

  return movie;
}

export async function findAll(query: GetMoviesQueryDTO) {
  const {
    page = "1",
    limit = "10",
    name,
    genres,
    language,
    releaseDate,
    sort,
    order = "desc",
  } = query;

  const where: WhereOptions = {};

  //WHERE name LIKE '%Spider%' any number of char to both of its side
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (language) {
    where.language = language;
  }

  if (releaseDate) {
    where.releaseDate = releaseDate;
  }

  /*genres = "Action"
 The `genres` column is stored as a JSON array in MySQL.
 ["Action", "Adventure", "Sci-Fi"]

 MySQL provides the JSON_CONTAINS() function for this.
 Sequelize equivalent of:
 WHERE JSON_CONTAINS(genres, '"Action"') = 1
 JSON.stringify(genres) converts:
 "Action"  --->  '"Action"'

 "Action" into the JSON string '"Action"' before passing it to JSON_CONTAINS().
 
 Op.and here means it is and operator and is used to perform and operation for all the sequelize fn*/
  if (genres) {
    (where as any)[Op.and] = [
      Sequelize.where(
        Sequelize.fn(
          "JSON_CONTAINS",
          Sequelize.col("genres"),
          JSON.stringify(genres),
        ),
        1,
      ),
    ];
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  const orderBy: Order = [];

  if (sort === "name" || sort === "releaseDate") {
    orderBy.push([sort, order.toUpperCase() === "ASC" ? "ASC" : "DESC"]);
  } else {
    orderBy.push(["createdAt", "DESC"]);
  }

  //order: [columnName, direction]

  const { rows: movies, count: total } = await Movie.findAndCountAll({
    where,
    limit: limitNumber,
    offset,
    order: orderBy,
  });

  logger.info(`${total} movies found`);

  return { movies, total };
}
