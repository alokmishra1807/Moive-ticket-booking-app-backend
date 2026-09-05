import express from 'express';
import { createTheatreController, deleteTheatrebyIdController, getTheatrebyIdController } from '../../controllers/theatre.controller';
import { validateRequestBody } from '../../validators';
import { createTheatreSchema } from '../../validators/theatre.validator';

// import { validateRequestBody } from '../../validators';
// import { pingSchema } from '../../validators/ping.validator';

const theatreRouter = express.Router();

theatreRouter.post('/',validateRequestBody(createTheatreSchema), createTheatreController );
theatreRouter.get('/:id',getTheatrebyIdController );
theatreRouter.delete('/:id',deleteTheatrebyIdController);


export default theatreRouter;