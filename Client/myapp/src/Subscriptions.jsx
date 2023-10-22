import { Outlet, useNavigate } from "react-router-dom";

function SubscriptionsComp() {
  const navigate = useNavigate();

  const presentAllMembers = () => {
    navigate("");
  };

  const goToAddMember = () => {
    navigate("addMember");
  };

  return (
    <div style={{ width: "800px", border: "solid 2px blue" }}>
      <h3>subscriptions</h3>
      <button onClick={presentAllMembers}>all Members</button> <br />
      <button onClick={goToAddMember}>add a Member</button>
      <br />
      <br />
      <Outlet />
      <br />
    </div>
  );
}

export default SubscriptionsComp;
