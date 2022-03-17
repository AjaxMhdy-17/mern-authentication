import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import setAuthToken from "./Utils/setAuthToken";
import Header from "./Components/Header/Header";
import FrontPage from "./Components/FrontPage/FrontPage";
import Discussion from "./Components/Discussion/Discussion";
import Register from "./Components/Auth/Register/Register";
import Login from "./Components/Auth/Login/Login";
import { LoadCurrentUser } from "./Redux/Actions/userActions";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import ResetPassword from "./Components/Auth/ResetPassword";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated, user } = userRed;

  useEffect(() => {
    dispatch(LoadCurrentUser());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/discussion"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              pathName="/discussion"
            >
              <Discussion />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password/" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/discussion" element={<Discussion />} />
      </Routes>
    </div>
  );
}

export default App;
