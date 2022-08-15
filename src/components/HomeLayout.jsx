import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/posts" replace />;
  }

  return (
    <div>
      <AppBar pages={[{ label: "Login", path: "/" }]} />
      {outlet}
    </div>
  );
};
