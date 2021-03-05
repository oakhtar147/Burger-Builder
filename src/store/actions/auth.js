import axios from "axios";

import * as actionTypes from "./actionTypes";

const AUTH_SIGNUP_ENDPOINT =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAR0QSiw8jnvaY6OZdtfQwOuOHsproDACY";

const AUTH_SIGNIN_ENDPOINT =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR0QSiw8jnvaY6OZdtfQwOuOHsproDACY";

const authStarted = () => {
  return {
    type: actionTypes.AUTH_STARTED,
  };
};

const auth = (idToken, localId) => {
  return {
    type: actionTypes.AUTH,
    idToken,
    localId,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authLogoutAsync = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authAsync = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStarted());
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    axios
      .post(isSignup ? AUTH_SIGNUP_ENDPOINT : AUTH_SIGNIN_ENDPOINT, payload)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data;
        dispatch(auth(idToken, localId));
        dispatch(authLogoutAsync(expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};
