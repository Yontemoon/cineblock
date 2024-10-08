import { useSession } from "../hooks/useSession";
import { TMovie } from "../types/tmdb.types";
import useWatchlistMutation from "../hooks/mutations/useWatchlistMutation";
import useFavoriteMutation from "../hooks/mutations/useFavoriteMutation";

type PropTypes = {
  isWatchlist: boolean;
  isFavorite: boolean;
  rating: number;
  movieDetail: TMovie;
};

const PosterHoverCard = ({
  isWatchlist,
  isFavorite,
  rating,
  movieDetail,
}: PropTypes) => {
  const { user } = useSession();

  const { watchlistMutate, watchlistPending } = useWatchlistMutation();
  const { favMutate, favPending } = useFavoriteMutation();

  return (
    <div className="bg-gray-400 transition-all duration-200 ease-linear shadow-md">
      <button
        onClick={() =>
          watchlistMutate({
            userId: user?.id as string,
            movieInfo: movieDetail,
          })
        }
      >
        {watchlistPending ? (
          <div className="animate-spin h-5 w-5 mr-3 ">Loading</div>
        ) : isWatchlist ? (
          "remove from watchlist"
        ) : (
          "Add to watchlist"
        )}
      </button>
      <button
        onClick={() =>
          favMutate({ userId: user?.id as string, movieInfo: movieDetail })
        }
      >
        {favPending ? (
          <div>Loading</div>
        ) : isFavorite ? (
          "Remove from Favorite"
        ) : (
          "Add to Favorite"
        )}
      </button>
      <button>rating</button>
    </div>
  );
};

export default PosterHoverCard;
