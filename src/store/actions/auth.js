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

export const authLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirateDate");
  localStorage.removeItem("userId");
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
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", localId);
        dispatch(auth(idToken, localId));
        dispatch(authLogoutAsync(expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      dispatch(authLogout());
    }
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(authLogout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(auth(token, userId));
      dispatch(
        authLogoutAsync(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};
