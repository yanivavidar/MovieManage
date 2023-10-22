import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MemberWatchedMoviesComp from "./MemberWatchedMovies";

function MemberComp(props) {
  const [memberData, setMemberData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getMemberData() {
      let resp = await axios.get(
        "http://localhost:8000/api/member/" + props.memberId
      );
      setMemberData(resp.data);
    }
    getMemberData();
  }, []);

  const goToEditMembers = () => {
    navigate("editMember/" + props.memberId);
  };

  const deleteMember = async () => {
    dispatch({ type: "DELETE_BY_MEMBERID", payload: props.memberId });

    await axios.delete("http://localhost:8000/api/member/" + props.memberId);
    alert("member info deleted successfully");
    window.location.reload(false);
  };

  return (
    <div>
      <div style={{ width: "500px", border: "solid 2px blue" }}>
        <h3>{memberData.name}</h3>
        email: {memberData.email} <br />
        city: {memberData.city} <br />
        <button onClick={goToEditMembers}>edit</button> <br />
        <button onClick={deleteMember}>delete</button> <br />
        <br />
        <MemberWatchedMoviesComp
          key={props.memberId}
          memberId={props.memberId}
        />{" "}
        <br />
      </div>{" "}
      <br></br>
    </div>
  );
}

export default MemberComp;
