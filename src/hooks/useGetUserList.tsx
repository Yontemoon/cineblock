import { useQueries } from "@tanstack/react-query";
import { getFavorite, getRating, getWatchlist } from "../queries/getUserList";

const queryList = [
  { key: "favorite", fn: getFavorite },
  { key: "rating", fn: getRating },
  { key: "watchlist", fn: getWatchlist },
] as const;

export default function useGetUserList(userId: string | undefined) {
  const results = useQueries({
    queries: queryList.map((query) => ({
      queryKey: [query.key, userId],
      queryFn: () => query.fn(userId as string),
      enabled: !!userId,
    })),
  });

  // Improved logging
  results.forEach((result, index) => {
    if (result.isError) {
      console.error(`Error fetching ${queryList[index].key}:`, result.error);
    }
  });

  return results;
}
