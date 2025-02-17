import { Link } from "@tanstack/react-router";

export const homePage = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать!</h1>
      <div className="auth-buttons">
        <Link to="/SignIn">
          <button>Регистрация</button>
        </Link>
      </div>
    </div>
  );
};
