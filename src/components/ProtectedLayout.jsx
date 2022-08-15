import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  console.log("user", user);
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "About", path: "about" },
          { label: "Posts", path: "posts" }
        ]}
      />
      {outlet}
    </div>
  );
};
