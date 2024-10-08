import { useQuery } from "@tanstack/react-query";
import { getFavorite, getRating, getWatchlist } from "../queries/getUserList";

export default function useGetUserList(userId: string | undefined) {
  // Fetch user's favorite list
  const favoriteQuery = useQuery({
    queryKey: ["favorite", userId],
    queryFn: () => getFavorite(userId as string),
  });

  // Fetch user's rating list
  const ratingQuery = useQuery({
    queryKey: ["rating", userId],
    queryFn: () => getRating(userId as string),
    enabled: !!userId,
  });

  // Fetch user's watchlist
  const watchlistQuery = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getWatchlist(userId as string),
    enabled: !!userId,
  });

  // Return all queries in an object
  return { favoriteQuery, ratingQuery, watchlistQuery };
}
