import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMemberComp() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    async function getMembers() {
      let resp = await axios.get("http://localhost:8000/api/member");
      setMembers(resp.data);
    }
    getMembers();
  }, []);

  const saveMember = async () => {
    if (member.name == "") {
      setIsValid(false);
    } else {
      setIsValid(true);

      await axios.post("http://localhost:8000/api/member", member);
      navigate("/mainpage/subscriptions");
    }
  };

  const customSubmit = (e) => {
    e.preventDefault();
  };

  const goToAllMembers = () => {
    navigate("/mainpage/subscriptions");
  };

  return (
    <div>
      <h3 style={{ textAlign: "left" }}> &nbsp; add new member:</h3>

      <form onSubmit={customSubmit} style={{ textAlign: "left" }}>
        &nbsp; member name:{" "}
        <input
          type="text"
          onChange={(e) => setMember({ ...member, name: e.target.value })}
        />{" "}
        <br />
        &nbsp; email:{" "}
        <input
          type="text"
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />{" "}
        <br />
        &nbsp; city:{" "}
        <input
          type="text"
          onChange={(e) => setMember({ ...member, city: e.target.value })}
        />{" "}
        <br />
        <br />
        &nbsp; <button onClick={saveMember}>save</button> &nbsp;
        <button onClick={goToAllMembers}>cancel</button> <br /> <br />
        {!isValid && <span>fill member info before saving</span>}
      </form>
    </div>
  );
}

export default AddMemberComp;
