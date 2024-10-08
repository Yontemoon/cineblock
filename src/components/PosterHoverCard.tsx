import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateWatchlist from "../queries/updateWatchlist";
import { useSession } from "../hooks/useSession";
import { TMovie } from "../types/tmdb.types";
import { TSWatchlist } from "../types/supabase.types";

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
  const queryClient = useQueryClient();

  const watchlistMutation = useMutation({
    mutationFn: () => updateWatchlist(user?.id, movieDetail),

    // onError: (error, _movieId, context) => {
    //   if (error) {
    //     throw Error(error.message);
    //   }
    //   queryClient.setQueryData(["watchlist"], context?.prevWatchlist);
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  function handleWatchlist() {
    watchlistMutation.mutate(user?.id, movieDetail);
  }

  return (
    <div className="bg-gray-400 transition-all duration-200 ease-linear shadow-md">
      <button onClick={handleWatchlist}>
        {watchlistMutation.isPending ? (
          <div className="animate-spin h-5 w-5 mr-3 ">Loading</div>
        ) : isWatchlist ? (
          "remove from watchlist"
        ) : (
          "Add to watchlist"
        )}
      </button>
      <button>favorite</button>
      <button>rating</button>
    </div>
  );
};

export default PosterHoverCard;
