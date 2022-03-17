import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../Redux/Actions/userActions";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate() 
  const dispatch = useDispatch() 
  const userRed = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated, user } = userRed;
  console.log(userRed);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  const handleSubmitForm = (data) => {
    dispatch(RegisterUser(data));
    reset();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto my-5">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>{errors.name && <span>please enter your name</span>}</h4>
              <input
                type="text"
                className="form-control"
                placeholder="enter name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
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
            <button className="btn btn-info col-12 mt-3">register</button>
          </form>
          <div className="register__link mt-4">
            <Link to="/login">have a account , login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
