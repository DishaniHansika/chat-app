import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [groupName, setGroupName] = useState("");

  const handleGroupChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={handleGroupChange}
      />
      <Link className="joinBtn" to={`/${groupName}`}>
        Join Group
      </Link>
    </div>
  );
};

export default Home;
