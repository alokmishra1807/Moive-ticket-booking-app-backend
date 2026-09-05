
import sequelize from "../db/models/sequelize";
import { CreateSeatDTO, CreateTheatreDTO } from "../dto/theatre.dto";
import { createScreen, createSeats, createTheatre, deleteTheatrebyId, getTheatrebyId } from "../repositories/theatre.repository";

export async function createTheatreService(theatreData : CreateTheatreDTO) {
    const t = await sequelize.transaction();
    const theatre = await createTheatre(theatreData,t);

    console.log(theatre);

    const screenData = [];

  for (const screen of theatreData.screens) {
    screenData.push({
      theatreId : theatre.id,
      name: screen.name,
      totalRows: screen.totalRows,
      totalColumns: screen.totalColumns,
    });
  }

  console.log(screenData[0]);

  const screens = await createScreen(screenData,t);

   const seatData: CreateSeatDTO[] = [];

    for (const screen of screens) {

        for (let row = 0; row < screen.totalRows; row++) {

            const rowName = String.fromCharCode(65 + row);

            for (let col = 1; col <= screen.totalColumns; col++) {

                seatData.push({
                    screenId: screen.id,
                    rowName,
                    seatNumber: col,
                    seatType: "NORMAL",
                    isActive: true
                });

            }

        }

    }

    await createSeats(seatData,t);

     await t.commit();

    return theatre;


    
}

export async function getTheatrebyIdService(id : number) {

    //transaction is not needed here as we are just making multiple read so avoid it
    const theatre = await getTheatrebyId(id); //made association inside the get Theatre itself;

//     const screen = await getScreenDetailsbyThreatreId(theatre.id);
//     if(!screen){
//         return theatre;
//     }
//    const  row = screen.totalRows;
//    const col = screen.totalColumns;
//    return {theatre, totalSeat : row * col};



const result = {
  id: theatre.id,
  name: theatre.name,
  city: theatre.city,
  pin: theatre.pin,
  address: theatre.address,
  screens: theatre.screens!.map(screen => ({
    id: screen.id,
    name: screen.name,
    totalRows: screen.totalRows,
    totalColumns: screen.totalColumns,
    totalSeats: screen.totalRows * screen.totalColumns,
  })),
};

return result;




    
}

export async function deleteTheatrebyIdService(id : number) {
    const theatre = await deleteTheatrebyId(id);
    return theatre;
    
}