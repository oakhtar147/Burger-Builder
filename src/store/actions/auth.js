import axios from "axios";

import * as actionTypes from "./actionTypes";

const AUTH_ENDPOINT =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAR0QSiw8jnvaY6OZdtfQwOuOHsproDACY";

const authStarted = () => {
  return {
    type: actionTypes.AUTH_STARTED,
  };
};

const auth = (data) => {
  return {
    type: actionTypes.AUTH,
    data,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const authAsync = (email, password) => {
  return (dispatch) => {
    dispatch(authStarted());
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(AUTH_ENDPOINT, payload)
      .then((response) => {
        console.log(response);
        dispatch(auth(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailed(error));
      });
  };
};
