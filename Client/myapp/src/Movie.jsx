import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import SubscriptionsWatchedComp from "./SubscriptionsWatched";
import { useDispatch, useSelector } from "react-redux";

function MovieComp(props) {
  const [movieData, setMovieData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genresData, setGenres] = useState([]);
  const storeData = useSelector((state) => state);

  useEffect(() => {
    async function getMovieData() {
      try {
        let resp = await axios.get(
          "http://localhost:8000/api/movie/" + props.movieId
        );
        setMovieData(resp.data);
        setGenres(resp.data.genres || []); // Initialize genresData with an empty array if genres are missing
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }
    getMovieData();
  }, [props.movieId]);

  const goToEditMovie = () => {
    navigate("editMovie/" + props.movieId);
  };

  const deleteMovie = async () => {
    dispatch({ type: "DELETE_BY_MOVIEID", payload: props.movieId });

    await axios.delete("http://localhost:8000/api/movie/" + props.movieId);
    alert("movie deleted successfully");
    window.location.reload(false);
  };

  return (
    <div>
      <div style={{ width: "850px", border: "solid 2px green" }}>
        <h4>
          {movieData.name}, {movieData.premiereYear}
        </h4>
        genres: {genresData.map((x) => x).join(", ")}
        <br />
        <br />
        <div>
          <div style={{ width: "49%", height: "300px", float: "left" }}>
            &nbsp; <img src={movieData.image} />
          </div>

          <div style={{ width: "49%", height: "300px", float: "right" }}>
            <SubscriptionsWatchedComp
              key={props.movieId}
              movieId={props.movieId}
            />
            <br />
            <br /> <br />
            <br />
          </div>
        </div>
        <br />
        <button onClick={goToEditMovie}>edit</button>
        <button onClick={deleteMovie}>delete</button> <br />
        <br />
      </div>{" "}
      <br></br>
    </div>
  );
}
export default MovieComp;
