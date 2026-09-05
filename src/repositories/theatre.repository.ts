import { Transaction } from "sequelize";
import logger from "../config/logger.config";
import Screen from "../db/models/screen";
import Seat from "../db/models/seat";
import Theatre from "../db/models/theatre";
import { CreateScreenDTO, CreateSeatDTO, CreateTheatreDTO } from "../dto/theatre.dto";
import { NotFoundError } from "../utils/error/app.error";


export async function createTheatre(theatreData : CreateTheatreDTO, t?: Transaction) {
    const theatre = await Theatre.create({
        ownerId:1,
        name:theatreData.name,
        address:theatreData.address,
        pin:theatreData.pin,
        city:theatreData.city,

    },{
   transaction:t,
    }
);

    logger.info(`Theatre with ${theatre.id} is registered`);
    return theatre;  
}

export async function createScreen(
  screenData: CreateScreenDTO[],
  t?: Transaction
) {
  const createdScreens = await Screen.bulkCreate(screenData, {
    transaction: t,
    returning: true,
  });

  logger.info("Screen created");
  return createdScreens;

}

export async function createSeats(
    seatData: CreateSeatDTO[],
    t?: Transaction
) {
    const seatCreated = Seat.bulkCreate(seatData, {
        transaction: t
    });

    logger.info("seat created");
    return seatCreated;
}

export async function deleteTheatrebyId(id:number) {
    const theatre = await Theatre.findByPk(id);

    if (!theatre) {
    logger.error(`theatre with ${id} is not available`);
    throw new NotFoundError(`theatre : ${id} not found`);
  }
  logger.info(`theatre havind id:${theatre.id} deleted`);
  await theatre.destroy();

  return theatre;
    
}

export async function getTheatrebyId(id:number) {
    const theatre = await Theatre.findByPk(id, {
  include: [
    {
      model: Screen,
      as:"screens",
      attributes: ["id", "name", "totalRows", "totalColumns"],
    },
  ],
});
    if (!theatre) {
    logger.error(`theatre with ${id} is not available`);
    throw new NotFoundError(`theatre : ${id} not found`);
  }
  logger.info(`theatre havind id:${theatre.id} found successfully`);
  return theatre;
 
}

