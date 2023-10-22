import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditMovieComp() {
  const params = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    premiereYear: 0,
    generes: [""],
    image: "",
  });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getMovieData() {
      let movieid = params.id;
      let resp = await axios.get("http://localhost:8000/api/movie/" + movieid);
      setMovie(resp.data);
      setGenres(resp.data.generes);
    }
    getMovieData();
  }, []);

  const customSubmit = (e) => {
    e.preventDefault();
  };

  const updateMovie = async () => {
    let movieid = params.id;
    await axios.put("http://localhost:8000/api/movie/" + movieid, movie);
    navigate("/mainpage");
  };

  const goToAllMovies = () => {
    navigate("/mainpage");
  };

  return (
    <div>
      <h3 style={{ textAlign: "left" }}>edit movie info: {movie.name}</h3>

      <form onSubmit={customSubmit} style={{ textAlign: "left" }}>
        movie title:{" "}
        <input
          type="text"
          value={movie.name}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />{" "}
        <br />
        genres:{" "}
        <input
          type="text"
          value={movie.generes}
          onChange={(e) =>
            setMovie({ ...movie, ...genres, generes: e.target.value })
          }
        />{" "}
        <br />
        image url:{" "}
        <input
          type="text"
          value={movie.image}
          onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        />{" "}
        <br />
        premiere year:{" "}
        <input
          type="number"
          min="1900"
          value={movie.premiereYear}
          onChange={(e) => setMovie({ ...movie, premiereYear: e.target.value })}
        />{" "}
        <br />
        <br />
        <button onClick={updateMovie}>update</button> <br />
        <button onClick={goToAllMovies}>cancel</button>
      </form>
    </div>
  );
}

export default EditMovieComp;
