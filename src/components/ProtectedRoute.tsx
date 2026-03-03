import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ADMIN_EMAIL = "muhammadsharifjonov11@gmail.com"; 

const ProtectedRoute = ({ children }: any) => {
  const user = auth.currentUser;

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;