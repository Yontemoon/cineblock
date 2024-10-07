import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { fetchTMDBData } from "../fetch/tmdbDate";
import { TMovie } from "../types/tmdb.types";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import Card from "../components/Card";
import useGetUserList from "../hooks/useGetUserList";
import { useSession } from "../hooks/useSession";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MainPage,
});

const movieQueries = [
  { key: "popularMovies", endpoint: "/movie/popular" },
  { key: "upcomingMovies", endpoint: "/movie/upcoming" },
  { key: "topRatedMovies", endpoint: "/movie/top_rated" },
];

function MainPage() {
  const { user } = useSession();
  const movieList = useQueries({
    queries: movieQueries.map(({ key, endpoint }) => ({
      queryKey: [key],
      queryFn: async () => {
        const response = await fetchTMDBData(endpoint);
        return response.results as TMovie[];
      },
    })),
  });

  const [favorites, rating, watchlist] = useGetUserList(user?.id);
  const [popular, upcoming, topRated] = movieList;

  const isLoading =
    movieList.some((result) => result.isLoading) ||
    [favorites, rating, watchlist].some((query) => query.isLoading);

  const isError =
    movieList.some((result) => result.isError) ||
    [favorites, rating, watchlist].some((query) => query.isError);

  if (isError) return <div>Error occurred. Please try again later.</div>;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card className="flex flex-wrap gap-3 m-auto mb-4">
            {popular.data &&
              popular.data.map((movie) => (
                <Link
                  to="/movie/$id"
                  params={{
                    id: movie.id.toString(),
                  }}
                >
                  <Poster
                    movieDetails={movie}
                    key={movie.id}
                    isFavorite={
                      favorites.data &&
                      favorites.data.some(
                        (fav) => fav.movie_id === movie.id || false
                      )
                    }
                    isWatchlist={
                      watchlist.data &&
                      watchlist.data.some(
                        (fav) => fav.movie_id === movie.id || false
                      )
                    }
                  />
                </Link>
              ))}
          </Card>
          <Card className="flex flex-wrap gap-3 m-auto mb-4">
            {upcoming.data &&
              upcoming.data.map((movie) => (
                <Poster
                  movieDetails={movie}
                  key={movie.id}
                  isFavorite={
                    favorites.data &&
                    favorites.data.some(
                      (fav) => fav.movie_id === movie.id || false
                    )
                  }
                  isWatchlist={
                    watchlist.data &&
                    watchlist.data.some(
                      (fav) => fav.movie_id === movie.id || false
                    )
                  }
                />
              ))}
          </Card>
          <Card className="flex flex-wrap gap-3 m-auto mb-4">
            {topRated.data &&
              topRated.data.map((movie) => (
                <Poster
                  movieDetails={movie}
                  key={movie.id}
                  isFavorite={
                    favorites.data &&
                    favorites.data.some(
                      (fav) => fav.movie_id === movie.id || false
                    )
                  }
                  isWatchlist={
                    watchlist.data &&
                    watchlist.data.some(
                      (fav) => fav.movie_id === movie.id || false
                    )
                  }
                />
              ))}
          </Card>
        </>
      )}
    </div>
  );
}
