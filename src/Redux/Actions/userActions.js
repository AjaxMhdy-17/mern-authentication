import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";

export const ResetPassword = (email) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:8080/api/user/reset-password`, { email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const NewPassword = (password, token) => {
  return (dispatch) => {
  
    axios
      .post(`http://localhost:8080/api/user/new-password`, {
        password: password,
        token: token,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const LoadCurrentUser = () => {
  return (dispatch) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    dispatch({
      type: "loading",
    });

    axios
      .get("http://localhost:8080/api/user/currentUser")
      .then((res) => {
        dispatch({
          type: "loadUserSuccess",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "error",
        });
      });
  };
};

export const LoginUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: "loading",
    });

    axios
      .post("http://localhost:8080/api/user/loginUser", userData)
      .then((res) => {
        dispatch({
          type: "loginUserSuccess",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "error",
        });
      });
  };
};

export const RegisterUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: "loading",
    });

    axios
      .post("http://localhost:8080/api/user/createUser", userData)
      .then((res) => {
        dispatch({
          type: "registerSuccess",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "error",
        });
      });
  };
};

export const Logout = () => {
  return (dispatch) => {
    dispatch({
      type: "error",
    });
  };
};
