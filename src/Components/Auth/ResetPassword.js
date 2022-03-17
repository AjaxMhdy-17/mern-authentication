import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NewPassword } from "../../Redux/Actions/userActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {

    //   const pass = data.password 
    //   console.log(pass);
    dispatch(NewPassword(data.password , params.token))
    reset();
    navigate('/login' , {
        replace : true 
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto my-5">
          <h3 className="my-3">
              Enter New Password
          </h3>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>
                {errors.password && (
                  <span>password length more then 5 characture</span>
                )}
              </h4>
              <input
                className="form-control"
                type="text"
                placeholder="enter new password"
                {...register("password", { required: true, minLength: 5 })}
              />
            </div>
            <button className="btn btn-info col-12 mt-3">confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
