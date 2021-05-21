import React from "react";
import useLogin from "../../hooks/useLogin";

function Login() {
  const handleLogin = useLogin();

  return (
    <button onClick={() => handleLogin(true)}>
      Goggle Login
    </button>
  );
}

export default Login;
