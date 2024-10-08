import { Tables } from "./supabaseSchema.types";

type TSWatchlist = Tables<"watchlist">;
type TSFavorites = Tables<"favorites">;
type TSMovies = Tables<"movies">;
type TSRating = Tables<"ratings">;

export type TSUsersList = {
  watchlist: TSWatchlist[];
  favorites: TSFavorites[];
  rating: TSRating[];
};

export type { TSFavorites, TSMovies, TSRating, TSWatchlist };
