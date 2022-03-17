import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginUser } from "../../../Redux/Actions/userActions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRed = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated, user, token } = userRed;
  const { state } = useLocation();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  const handleSubmitForm = (data) => {
    dispatch(LoginUser(data, navigate));
    reset();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto my-5">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>{errors.email && <span>please enter a valid email</span>}</h4>
              <input
                type="email"
                className="form-control"
                placeholder="enter email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.password && (
                  <span>password length more then 5 characture</span>
                )}
              </h4>
              <input
                className="form-control"
                type="text"
                placeholder="enter password"
                {...register("password", { required: true, minLength: 5 })}
              />
            </div>
            <button className="btn btn-info col-12 mt-3">login</button>
          </form>
          <div className="register__link mt-4">
            <Link to="/register">create a new account</Link>
          </div>
          <div className="register__link mt-4">
            <Link to="/forget-password">ForgetPassword</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
