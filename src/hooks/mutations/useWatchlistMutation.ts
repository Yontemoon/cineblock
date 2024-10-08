import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateWatchlist from "../../queries/updateWatchlist";
import { TSWatchlist } from "../../types/supabase.types";
import { TMovie } from "../../types/tmdb.types";

const useWatchlistMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (variables: { userId: string; movieInfo: TMovie }) =>
      updateWatchlist(variables),
    onMutate: async ({ userId, movieInfo }) => {
      await queryClient.cancelQueries({ queryKey: ["watchlist", userId] });
      const prevWatchlist = queryClient.getQueryData(["watchlist", userId]);
      const movieId = movieInfo.id;
      queryClient.setQueryData(
        ["watchlist", userId],
        (oldWatchlist: TSWatchlist[]) => {
          const isMovieInWatchlist = oldWatchlist.some(
            (m) => m.movie_id === movieId,
          );
          if (isMovieInWatchlist) {
            return oldWatchlist.filter((m) => m.movie_id !== movieId);
          } else {
            return [
              ...oldWatchlist,
              { ...movieInfo, movie_id: movieId, user_id: userId },
            ];
          }
        },
      );
      return { prevWatchlist, movieId };
    },

    onError: (_err, newTodo, context) => {
      queryClient.setQueryData(
        ["watchlist", newTodo.userId],
        context?.prevWatchlist,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return { mutate, isError, isPending };
};

export default useWatchlistMutation;
