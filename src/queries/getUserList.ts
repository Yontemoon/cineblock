import supabase from "../config/supabaseClient";

const getWatchlist = async (userId: string) => {
  try {
    const { data: watchlist, error: watchlistError } = await supabase.from(
      "watchlist",
    ).select("*").eq(
      "user_id",
      userId,
    );

    if (watchlistError) {
      throw Error(watchlistError.message);
    }

    return watchlist;
  } catch (error) {
    console.error(error);
    return;
  }
};

const getFavorite = async (userId: string) => {
  try {
    const { data: favorite, error: favError } = await supabase.from(
      "favorites",
    ).select("*").eq(
      "user_id",
      userId,
    );

    if (favError) {
      throw Error(favError.message);
    }
    return favorite;
  } catch (error) {
    console.error(error);
    return;
  }
};

const getRating = async (userId: string) => {
  try {
    const { data: rating, error: ratingError } = await supabase.from(
      "ratings",
    ).select("*").eq(
      "user_id",
      userId,
    );

    if (ratingError) {
      throw Error(ratingError.message);
    }

    return rating;
  } catch (error) {
    console.error(error);
    return;
  }
};

export { getFavorite, getRating, getWatchlist };
