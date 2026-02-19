import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TeacherRoute = ({ children }: Props) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return <Navigate to="/sign-in" />;
  if (currentUser.role !== "teacher") return <Navigate to="/" />;

  return <>{children}</>;
};

export default TeacherRoute;
