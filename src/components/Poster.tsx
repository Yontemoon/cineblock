import { TMovie } from "../types/tmdb.types";
import clsx from "clsx";

type PropTypes = {
  movieDetails: TMovie;
  isFavorite?: boolean;
  isWatchlist?: boolean;
  rating?: number | null;
};

const Poster = ({ movieDetails, isFavorite, ...props }: PropTypes) => {
  return (
    <div
      className={clsx(
        "box-border border-2 aspect-[2/3] max-w-36 h-auto",
        isFavorite && "border-red-500"
      )}
      {...props}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.original_title}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Poster;
