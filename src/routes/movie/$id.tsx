import { createFileRoute } from "@tanstack/react-router";
import getMovie from "../../queries/getMovie";

export const Route = createFileRoute("/movie/$id")({
  component: MovieDetails,
  loader: ({ params }) => getMovie(params.id),
});

function MovieDetails() {
  const movieDetail = Route.useLoaderData();
  console.log(movieDetail);
  return <div>{JSON.stringify(movieDetail)}</div>;
}
