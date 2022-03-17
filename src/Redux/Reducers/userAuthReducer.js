const initialState = {
  loading: false,
  isAuthenticated: false,
  token: localStorage.getItem("token") || null ,
  user: null,
  error: false,
};

const userAuthReducer = (state = initialState, action) => {
  if (action.type === "loading") {
    return {
      ...state,
      isAuthenticated: false,
      loading: true,
    };
  } else if (action.type === "loadUserSuccess") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload,
      loading: false,
    };
  } else if (
    action.type === "registerSuccess" ||
    action.type === "loginUserSuccess"
  ) {
    localStorage.setItem("token", action.payload.token);
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      token: action.payload.token,
    };
  } else if (action.type === "error") {
    localStorage.removeItem("token");
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      error: true,
    };
  }

  return state;
};

export default userAuthReducer;
