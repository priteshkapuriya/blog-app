import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", undefined);
  const navigate = useNavigate();

  const login = (data) => {
    console.log("data", data);
    setUser(undefined);
    fetch("https://js1.10up.com/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUser(data);
        isTokenValid(data.token);
      })
      .catch((error) => {
        setUser(null);
        console.error("Error:", error);
      });
  };

  const isTokenValid = (token) => {
    fetch("https://js1.10up.com/wp-json/jwt-auth/v1/token/validate", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/dashboard/about", { replace: true });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const logout = () => {
    setUser(undefined);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
