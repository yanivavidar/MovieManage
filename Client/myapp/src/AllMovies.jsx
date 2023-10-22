import { useState, useEffect } from "react";
import axios from "axios";
import MovieComp from "./Movie";

function AllMoviesComp() {
  const [moviesId, setMoviesId] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  useEffect(() => {
    async function getMoviesId() {
      let resp = await axios.get("http://localhost:8000/api/movie");
      setMoviesData(resp.data);
      setMoviesId(resp.data.map((x) => x._id));
    }
    getMoviesId();
  }, []);

  const findMovieByName = () => {
    if (searchMovie === "") {
      setIsSearchEmpty(true);
      alert("Please enter a movie name to search.");
    } else {
      setIsSearchEmpty(false);
    }
  };

  return (
    <div>
      Find movies:{" "}
      <input onChange={(e) => setSearchMovie(e.target.value)} type="text" />{" "}
      <button onClick={findMovieByName}>Find</button> <br />
      <br />
      <div>
        {isSearchEmpty
          ? moviesId.map((x) => <MovieComp key={x} movieId={x} />)
          : moviesData
              .filter((movie) => movie.name.includes(searchMovie))
              .map((movie) => (
                <MovieComp key={movie._id} movieId={movie._id} />
              ))}
      </div>
    </div>
  );
}

export default AllMoviesComp;
