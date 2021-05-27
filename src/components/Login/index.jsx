import React from "react";
import useLogin from "../../hooks/useLogin";

function Login() {
  const handleLogin = useLogin();

  return (
    <div className="login-container">
      <div className="app-title">
        Anonym
      </div>
      <button className="login-button" onClick={() => handleLogin(true)}>
        Goggle Login
      </button>
    </div>
  );
}

export default Login;
