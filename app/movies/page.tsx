import React from "react";
import { moviesColumn } from "../people/column";
import { movies } from "../data/movies";
import Movies from "./Movies";

const page = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-center text-3xl font-semibold">Movies</h1>
      <Movies moviesColumn={moviesColumn} movies={movies} />
    </div>
  );
};

export default page;
