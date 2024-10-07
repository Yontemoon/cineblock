import { TMovie } from "../types/tmdb.types";
import clsx from "clsx";

type PropTypes = {
  movieDetails: TMovie;
  isFavorite?: boolean;
  isWatchlist?: boolean;
  rating?: number | null;
};

const Poster = ({
  movieDetails,
  isFavorite,
  isWatchlist,
  ...props
}: PropTypes) => {
  return (
    <div
      className={clsx(
        // "box-border border-r-4 border-b-4 aspect-[2/3] max-w-36 h-auto",
        "stream max-w-36 h-auto",
        isWatchlist && "border-green-500",
        isFavorite && "border-red-500"
      )}
      {...props}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.original_title}
        className="object-cover w-full h-full stream__thumbnail z-10"
      />
    </div>
  );
};

export default Poster;
