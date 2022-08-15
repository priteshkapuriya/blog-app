import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { login, user } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/dashboard/about" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username: username,
      password: password
    });
  };

  return (
    <>
      <h1>Login</h1>

      <div className="login">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              disabled={(username.length && password.length) === 0}
              type="submit"
              value="Submit"
            />
          </div>
        </form>
        { user === null &&
          <div className="error">
            Please enter Correct Username/Password...
          </div>
        }
      </div>
    </>
  );
};
