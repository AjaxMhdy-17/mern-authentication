import React, { useEffect } from "react";
import "./frontPage.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LoadCurrentUser } from "../../Redux/Actions/userActions";


const FrontPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated, user } = userRed;
  console.log(userRed);


  return <div>FrontPage</div>;
};

export default FrontPage;
