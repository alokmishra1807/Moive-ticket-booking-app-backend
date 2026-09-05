import { Request,Response,NextFunction } from "express";
import { createTheatreService, deleteTheatrebyIdService, getTheatrebyIdService } from "../services/theatre.service";

export async function createTheatreController(req:Request,res:Response,next:NextFunction) {

    const theatreResponse = await createTheatreService(req.body);

     res.status(201).json({
        message:"Theatre Created Successfully",
        data:theatreResponse,
        success:true
    })   
}

export async function getTheatrebyIdController(req:Request,res:Response,next:NextFunction) {

    const theatreResponse = await getTheatrebyIdService(Number(req.params.id));
    
    
     res.status(200).json({
        message:"Theatre found Successfully",
        data:theatreResponse,
        success:true
    })  
}

export async function deleteTheatrebyIdController(req:Request,res:Response,next:NextFunction) {

    const theatreResponse = await deleteTheatrebyIdService(Number(req.params.id));
    
    
     res.status(200).json({
        message:"Theatre deleted Successfully",
        data:theatreResponse,
        success:true
    })  
}