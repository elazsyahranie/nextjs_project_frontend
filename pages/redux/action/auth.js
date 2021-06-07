import axiosApiInstances from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiInstances.post("auth/login", data),
  };
};

export const RegisterUser = (data) => {
  return {
    type: "SIGNUP",
    payload: axiosApiInstances.post("auth/register", data),
  };
};

export const LogOut = (data) => {
  return {
    type: "LOGOUT",
  };
};
