import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTMDBData } from "../fetch/tmdbDate";
import Loader from "../components/Loader";
import getWatchlist from "../queries/getUser";

export const Route = createFileRoute("/")({
  component: MainPage,
});

function MainPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await fetchTMDBData("/movie/popular");
      return response.results;
    },
  });
  const { data: userWatchlist } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const response = await getWatchlist();
      return response;
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{isLoading ? <Loader /> : <div>Hello World</div>}</div>;
}
