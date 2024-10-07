import { fetchTMDBData } from "../fetch/tmdbDate";

async function getMovie(movieId: string | number) {
  const response = await fetchTMDBData(`/movie/${movieId}`);
  return response;
}

export default getMovie;
