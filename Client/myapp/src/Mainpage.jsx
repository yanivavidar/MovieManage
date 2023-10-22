import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function MainpageComp() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is logged in when the component is mounted
    let user = sessionStorage.getItem("loggedUser"); // Corrected sessionStorage key
    if (!user) {
      // If user is not logged in, show an alert and navigate to the login page
      alert("You can't access the Management Page without logging in!");
      navigate("/");
    } else {
      setUserName(user);

      async function getSubscribesData() {
        try {
          let resp = await axios.get("http://localhost:8000/api/subscription");
          let subscriptions = resp.data;

          dispatch({ type: "LOAD", payload: subscriptions });
        } catch (error) {
          console.error("Error loading subscriptions:", error);
        }
      }
      getSubscribesData();
    }
  }, [navigate, dispatch]);

  const goToMovies = () => {
    navigate("");
  };

  const goToSubs = () => {
    navigate("subscriptions");
  };

  const toLogout = () => {
    // Clear the user session data and then navigate to the login page
    sessionStorage.removeItem("loggedUser"); // Corrected sessionStorage key
    navigate("/");
  };

  return (
    <div>
      <h2>Hello {userName}! Welcome to ManageWeb</h2>
      <button onClick={goToMovies}>Movies</button> <br />
      <button onClick={goToSubs}>Subscriptions</button> <br />
      <button onClick={toLogout}>Log Out</button> <br />
      <br />
      <br />
      <Outlet />
    </div>
  );
}

export default MainpageComp;
