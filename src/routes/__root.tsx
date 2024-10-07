import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Navbar />
      <main className="m-auto max-w-6xl px-4">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  ),
});
