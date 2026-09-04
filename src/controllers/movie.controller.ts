import { NextFunction, Request, Response } from "express";
import { createMovieService, deleteMovieByIdService, getAllMoviesService, getMovieByIdService, updateMovieByIdService } from "../services/movie.service";

export async function createMovieController(req:Request, res: Response, next : NextFunction) {
    const movieResponse = await createMovieService(req.body);

    res.status(201).json({
        message:"Movie Created Successfully",
        data:movieResponse,
        success:true
    })   
}

export async function getMovieByIdController(req:Request, res:Response,next:NextFunction) {
    const movieResponse = await getMovieByIdService(Number(req.params.id));

       res.status(200).json({
        message:"Movie found Successfully",
        data:movieResponse,
        success:true
    })
}

export async function deleteMovieByIdController(req:Request,res:Response,next:NextFunction) {
    const movieResponse = await deleteMovieByIdService(Number(req.params.id));

       res.status(200).json({
        message:"Movie deleted Successfully",
        data:movieResponse,
        success:true
    })
}


export async function updateMovieController(req:Request, res: Response, next : NextFunction) {
    const movieResponse = await updateMovieByIdService(Number(req.params.id),req.body);

    res.status(200).json({
        message:"Movie Updated Successfully",
        data:movieResponse,
        success:true
    })   
}

export async function getAllMoviesController(req : Request,res: Response,next : NextFunction) {

    const moviesResponse = await getAllMoviesService(req.query);

       res.status(200).json({
        message:"Movies found Successfully",
        data:moviesResponse,
        success:true
    }) 


    
}