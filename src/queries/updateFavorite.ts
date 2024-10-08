import supabase from "../config/supabaseClient";
import { TMovie } from "../types/tmdb.types";
import insertMovie from "./insertMovie";

export default async function updateFavorite(
  { userId, movieInfo }: { userId: string; movieInfo: TMovie },
) {
  try {
    const isMoviePresent = await insertMovie(movieInfo);

    if (!isMoviePresent) return;

    const movieId = movieInfo.id;
    const { data: isInFavorites, error: selectError } = await supabase.from(
      "favorites",
    ).select().eq("user_id", userId)
      .eq("movie_id", movieId);

    if (selectError) throw Error(selectError.message);
    if (isInFavorites.length === 0) {
      const { error: insertError } = await supabase.from("favorites").insert({
        user_id: userId,
        movie_id: movieId,
      });
      if (insertError) throw Error(insertError.message);
    } else {
      const { error: deleteError } = await supabase.from("favorites").delete()
        .eq("user_id", userId).eq("movie_id", movieId);
      if (deleteError) throw Error(deleteError.message);
    }
    return isInFavorites;
  } catch (error) {
    console.error("Error in updating favorite");
    throw error;
  }
}
