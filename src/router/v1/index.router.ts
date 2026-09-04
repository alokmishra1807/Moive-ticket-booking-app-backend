import express from 'express';
import pingRouter from './ping_router';
import movieRouter from './movie.router';


const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use('/movies',movieRouter);

export default v1Router;