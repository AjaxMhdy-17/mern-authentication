import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children , location }) => {
  if (isAuthenticated === false) {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: location },
        }}
        replace
      />
    );
  }
  return children;
};

export default PrivateRoute;
