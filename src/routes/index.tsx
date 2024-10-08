import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { fetchTMDBData } from "../fetch/tmdbDate";
import { TMovie } from "../types/tmdb.types";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import Card from "../components/Card";
import useGetUserList from "../hooks/useGetUserList";
import { useSession } from "../hooks/useSession";

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

  const userList = useGetUserList(user?.id);

  const [popular, upcoming, topRated] = movieList;

  const isLoading =
    movieList.some((result) => result.isLoading) ||
    [
      userList.favoriteQuery,
      userList.ratingQuery,
      userList.watchlistQuery,
    ].some((query) => query.isLoading);

  const isError =
    movieList.some((result) => result.isError) ||
    [
      userList.favoriteQuery,
      userList.ratingQuery,
      userList.watchlistQuery,
    ].some((query) => query.isError);

  if (isError) return <div>Error occurred. Please try again later.</div>;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card className="flex flex-wrap gap-3 m-auto mb-4 justify-center">
            {popular.data &&
              popular.data.map((movie) => (
                <Poster
                  movieDetails={movie}
                  key={movie.id}
                  isFavorite={
                    (userList.favoriteQuery.data &&
                      userList.favoriteQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  isWatchlist={
                    (userList.watchlistQuery.data &&
                      userList.watchlistQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  rating={
                    (userList.ratingQuery.data &&
                      userList.ratingQuery.data.find(
                        (rated) => rated.movie_id === movie.id
                      )?.rating_number) ||
                    0
                  }
                />
              ))}
          </Card>
          <Card className="flex flex-wrap gap-3 m-auto mb-4">
            {upcoming.data &&
              upcoming.data.map((movie) => (
                <Poster
                  movieDetails={movie}
                  key={movie.id}
                  isFavorite={
                    (userList.favoriteQuery.data &&
                      userList.favoriteQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  isWatchlist={
                    (userList.watchlistQuery.data &&
                      userList.watchlistQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  rating={
                    (userList.ratingQuery.data &&
                      userList.ratingQuery.data.find(
                        (rated) => rated.movie_id === movie.id
                      )?.rating_number) ||
                    0
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
                    (userList.favoriteQuery.data &&
                      userList.favoriteQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  isWatchlist={
                    (userList.watchlistQuery.data &&
                      userList.watchlistQuery.data.some(
                        (fav) => fav.movie_id === movie.id
                      )) ||
                    false
                  }
                  rating={
                    (userList.ratingQuery.data &&
                      userList.ratingQuery.data.find(
                        (rated) => rated.movie_id === movie.id
                      )?.rating_number) ||
                    0
                  }
                />
              ))}
          </Card>
        </>
      )}
    </div>
  );
}
