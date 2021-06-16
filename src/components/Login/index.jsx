import useLogin from "../../hooks/useLogin";

function Login() {
  const handleClick = useLogin();

  return (
    <div className="login-container">
      <div className="login-container__title">
        Anonym
      </div>
      <button
        className="login-container__login"
        onClick={handleClick}
        data-testid="login"
      >
        Goggle Login
      </button>
    </div>
  );
}

export default Login;
