import { CreateMovieDTO, GetMoviesQueryDTO } from "../dto/movie.dto";
import { createMovieRepository, deleteMovieById, findAll, getMovieById, updateMovieById } from "../repositories/movie.repository";


export async function createMovieService(movieData : CreateMovieDTO) {
    const movie = createMovieRepository(movieData);
    return movie;  
}


export async function getMovieByIdService(id : number) {
    const movie = getMovieById(id);
    return movie;
}


export async function deleteMovieByIdService(id : number) {
    const movie = deleteMovieById(id);
    return movie;  
}


export async function updateMovieByIdService(id:number, movieData:Partial<CreateMovieDTO>) {
    const movie = await updateMovieById(id,movieData);
    return movie;
    
}

export async function getAllMoviesService(query : GetMoviesQueryDTO) {

    const movies = findAll(query);
    return movies;
    
}