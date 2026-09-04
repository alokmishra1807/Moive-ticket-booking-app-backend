import { z } from "zod";

export const movieSchema = z.object({
  name: z.string().min(2, "Movie name must be at least 2 characters"),
  
  description: z.string().min(5, "Description must be at least 5 characters"),

  casts: z.array(z.string().min(1)).min(1, "At least one cast member is required"),
  genres: z.array(z.string().min(1)).min(1, "At least one cast member is required"),

  trailerUrl: z.string().url("Trailer URL must be a valid URL"),

  language: z.string().default("English").optional(),

  releaseDate: z .string().regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Release date must be in YYYY-MM-DD format"),
  director: z
    .string()
    .min(2, "Director name must be at least 2 characters"),

  releaseStatus: z
    .enum(["RELEASED", "UPCOMING"])
    .default("RELEASED")
    .optional(),

});

export const updateMovieSchema = movieSchema.partial();


export const movieQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(), // search by name
  genre: z.string().optional(),
  language: z.string().optional(),
  sort: z.enum(['releaseDate', 'name']).optional()
});