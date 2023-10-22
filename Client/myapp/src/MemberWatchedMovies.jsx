import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddSubscribeComp from "./AddSubscribe";

function MemberWatchedMoviesComp(props) {
  const storeData = useSelector((state) => state);

  const [movieData, setMovieData] = useState([]);
  const [isShowed, setIsShowed] = useState(false);

  useEffect(() => {
    async function getData() {
      {
        let resp2 = await axios.get("http://localhost:8000/api/movie");
        setMovieData(resp2.data);
      }
    }
    getData();
  }, []);

  return (
    <div style={{ width: "400px", border: "solid 2px red" }}>
      <h4>movies watched</h4>
      <button onClick={() => setIsShowed(!isShowed)}>
        subscribe to a new movie
      </button>{" "}
      <br />
      {isShowed && (
        <AddSubscribeComp key={props.memberId} memberId={props.memberId} />
      )}
      <ul style={{ textAlign: "start" }}>
        {storeData
          .filter((x) => x.memberID === props.memberId)
          .map((sub) => {
            return (
              <li key={sub.movieID} value={sub.movieID}>
                {movieData
                  .filter((x) => x._id == sub.movieID)
                  .map((x) => {
                    return (
                      <Link to={"/mainpage"} value={x.name}>
                        {x.name}
                      </Link>
                    );
                  })}
                , {sub.date}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MemberWatchedMoviesComp;
