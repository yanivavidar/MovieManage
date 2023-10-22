import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMovieComp() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      let resp = await axios.get("http://localhost:8000/api/movie");
      setMovies(resp.data);
    }
    getMovies();
  }, []);

  const saveMovie = async () => {
    await axios.post("http://localhost:8000/api/movie", movies);
    navigate("/mainpage");
  };

  const customSubmit = (e) => {
    e.preventDefault();
  };

  const goToAllMovies = () => {
    navigate("/mainpage");
  };

  return (
    <div>
      <h3 style={{ textAlign: "left" }}>add a movie to website:</h3>

      <form onSubmit={customSubmit} style={{ textAlign: "left" }}>
        movie Title:{" "}
        <input
          type="text"
          onChange={(e) => setMovies({ ...movies, name: e.target.value })}
        />{" "}
        <br />
        <br />
        genres:{" "}
        <input
          type="genre"
          onChange={(e) => setMovies({ ...movies, generes: e.target.value })}
        />{" "}
        <br />
        <br />
        image url:{" "}
        <input
          type="text"
          onChange={(e) => setMovies({ ...movies, image: e.target.value })}
        />{" "}
        <br />
        <br />
        premiere year:{" "}
        <input
          type="number"
          min="1900"
          onChange={(e) =>
            setMovies({ ...movies, premiereYear: e.target.value })
          }
        />{" "}
        <br />
        <br />
        <button onClick={saveMovie}>Save</button> <br />
        <button onClick={goToAllMovies}>Cancel</button>
      </form>
    </div>
  );
}

export default AddMovieComp;
