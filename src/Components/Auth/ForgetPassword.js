import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ResetPassword } from "../../Redux/Actions/userActions";

const ForgetPassword = () => {
  const [sent, setSent] = useState(false);
    const dispatch = useDispatch() 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    setSent(true);
    // console.log(data.email);
    dispatch(ResetPassword(data.email))
    reset();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto my-5">
          <h3 className="my-3">
            {sent ? "Please Check Your Email" : "Enter Your Email"}
          </h3>
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
                disabled={sent}
              />
            </div>
            <button disabled={sent} className="btn btn-info col-12 mt-3">send email</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
