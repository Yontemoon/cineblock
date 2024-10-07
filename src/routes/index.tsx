import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div className="text-xl font-bold underline">Hello /!</div>,
});
