export const fetchTMDBData = async (endpoint: string) => {
  const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
    headers: {
      Authorization: import.meta.env.VITE_TMDB_AUTHORIZATION,
      "Content-Type": "application/json",
    },
    // cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TMDB Data at ${endpoint}`);
  }

  return response.json();
};
