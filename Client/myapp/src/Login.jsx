import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComp() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    async function getUsersData() {
      let resp = await axios.get("http://localhost:8000/api/user");
      setUsers(resp.data);
    }
    getUsersData();
  }, []);

  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedUser = sessionStorage.getItem("loggedUser");
    if (loggedUser) {
      navigate("/mainpage");
      alert("User already logged in");
    }
  }, [navigate]);

  const getLogin = () => {
    const dbuser = users.find((x) => x.username === user.username);
    if (dbuser && dbuser.password === user.password) {
      sessionStorage.setItem("loggedUser", dbuser.name);
      navigate("/mainpage");
    } else {
      alert("Incorrect input (username or password), please try again.");
    }
  };

  return (
    <div>
      <h2>login manager</h2>
      username :{" "}
      <input
        type="text"
        placeholder="Enter your username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />{" "}
      <br />
      <br />
      password :{" "}
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />{" "}
      <br />
      <button onClick={getLogin}>login</button>
    </div>
  );
}

export default LoginComp;
