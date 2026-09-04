export interface CreateMovieDTO {
  name: string;
  description: string;
  casts: string[];
  genres:string[];
  trailerUrl: string;
  language?: string;
  releaseDate: string;
  director: string;
  releaseStatus?: string;
}

export interface GetMoviesQueryDTO {
  page?: string;
  limit?: string;
  language?: string;
  releaseDate?: string;
  name?: string;
  genres?:string;
  sort?: "name" | "releaseDate";
  order?: "asc" | "desc";

}
