import { useState } from "react";
import { TMovie } from "../types/tmdb.types";
import clsx from "clsx";
import PosterHoverCard from "./PosterHoverCard";
import { Link } from "@tanstack/react-router";
import { useSession } from "../hooks/useSession";

type PropTypes = {
  movieDetails: TMovie;
  isFavorite: boolean;
  isWatchlist: boolean;
  rating: number | 0;
};

const Poster = ({
  movieDetails,
  isFavorite,
  isWatchlist,
  rating,
  ...props
}: PropTypes) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useSession();

  return (
    <div
      className={clsx(
        "stream max-w-36 h-auto",
        isWatchlist && "border-green-500",
        isFavorite && "border-red-500"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Link
        className="z-10"
        to="/movie/$id"
        params={{
          id: movieDetails.id.toString(),
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.original_title}
          className="object-cover w-full h-full stream__thumbnail z-10"
        />
      </Link>
      <div
        className={clsx(
          "absolute left-1/2 bottom-1/2 z-50",
          isHovered ? "block" : "hidden"
        )}
      >
        {user && (
          <PosterHoverCard
            isWatchlist={isWatchlist}
            isFavorite={isFavorite}
            rating={rating || 0}
            movieDetail={movieDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Poster;
