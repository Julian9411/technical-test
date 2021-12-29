import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, List, Login } from "./pages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReduxSelector } from "./redux";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { auth } = useReduxSelector((state) => state.auth);
  const location = useLocation();

  if (!auth.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const Navigation = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route
      path="/list"
      element={
        <RequireAuth>
          <List />
        </RequireAuth>
      }
    />
  </Routes>
);

export default Navigation;
