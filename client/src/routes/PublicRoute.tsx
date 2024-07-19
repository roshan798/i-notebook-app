import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/types";

export default function PublicRoute() {
  const { user } = useSelector((state: RootState) => state.user);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
