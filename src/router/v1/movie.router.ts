import express from 'express';
import { createMovieController, deleteMovieByIdController, getAllMoviesController, getMovieByIdController, updateMovieController } from '../../controllers/movie.controller';
import { validateRequestBody } from '../../validators';
import { movieSchema, updateMovieSchema } from '../../validators/movie.validator';


const movieRouter = express.Router();

movieRouter.post('/', validateRequestBody(movieSchema), createMovieController);
movieRouter.patch('/:id',validateRequestBody(updateMovieSchema), updateMovieController);
movieRouter.delete('/:id',deleteMovieByIdController);
movieRouter.get('/:id',getMovieByIdController);
movieRouter.get('/',getAllMoviesController);

export default movieRouter;