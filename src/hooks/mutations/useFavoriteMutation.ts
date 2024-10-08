import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateFavorite from "../../queries/updateFavorite";
import { TSFavorites } from "../../types/supabase.types";
import { TMovie } from "../../types/tmdb.types";

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (variables: { userId: string; movieInfo: TMovie }) =>
      updateFavorite(variables),
    onMutate: async ({ userId, movieInfo }) => {
      await queryClient.cancelQueries({ queryKey: ["favorite", userId] });
      const prevFavorite = queryClient.getQueryData(["favorite", userId]);
      const movieId = movieInfo.id;
      queryClient.setQueryData(
        ["favorite", userId],
        (oldFavorite: TSFavorites[]) => {
          const isMovieInWatchlist = oldFavorite.some(
            (m) => m.movie_id === movieId,
          );
          if (isMovieInWatchlist) {
            return oldFavorite.filter((m) => m.movie_id !== movieId);
          } else {
            return [
              ...oldFavorite,
              { ...movieInfo, movie_id: movieId, user_id: userId },
            ];
          }
        },
      );
      return { prevFavorite, movieId };
    },

    onError: (_err, newTodo, context) => {
      queryClient.setQueryData(
        ["watchlist", newTodo.userId],
        context?.prevFavorite,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
  });

  return { favMutate: mutate, favError: isError, favPending: isPending };
};

export default useFavoriteMutation;
