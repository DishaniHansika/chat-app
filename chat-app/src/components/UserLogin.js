import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

async function login(details) {
  return fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  }).then((data) => data.json());
}

const UserLogin = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login({
      username,
      password,
    });
    setToken(token);
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login">
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={handleUsername} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={handlePassword} />
        </label>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UserLogin;

UserLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
