import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
function MoviesComp() {
  const navigate = useNavigate();

  const goToAllMovies = () => {
    navigate("");
  };

  const goToAddMovie = () => {
    navigate("addMovie");
  };

  return (
    <div
      style={{ width: "900px", alignItems: "center", border: "solid 2px blue" }}
    >
      <h3>movies</h3>
      <button onClick={goToAllMovies}>all movies</button> <br />
      <button onClick={goToAddMovie}>add movie</button> <br />
      <Outlet />
    </div>
  );
}

export default MoviesComp;
