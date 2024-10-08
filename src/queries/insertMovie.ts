import { TMovie } from "../types/tmdb.types";
import supabase from "../config/supabaseClient";

async function insertMovie(movieDetails: TMovie) {
  try {
    const { data: moviePresent, error: movieError } = await supabase
      .from("movies")
      .select("movie_id")
      .eq("movie_id", movieDetails.id);

    if (movieError) {
      throw Error(`Error inserting movie, ${movieError.message}`);
    }

    if (moviePresent.length) return true;
    const { error: insertError } = await supabase.from("movies").insert({
      movie_id: movieDetails.id,
      backdrop_path: movieDetails.backdrop_path,
      genre_ids: movieDetails.genre_ids,
      original_language: movieDetails.original_language,
      overview: movieDetails.overview,
      popularity: movieDetails.popularity,
      poster_path: movieDetails.poster_path,
      release_date: movieDetails.release_date,
      title: movieDetails.title,
      video: movieDetails.video,
      vote_average: movieDetails.vote_average,
      vote_count: movieDetails.vote_count,
    });

    if (insertError) {
      throw new Error(`Error inserting movie: ${insertError.message}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default insertMovie;
