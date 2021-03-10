import * as actionTypes from "../actions/actionTypes";
import { updateObject as updateState } from "../../shared/utility";

const initState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStarted = (state, action) => {
  return updateState(state, { loading: true });
};

const auth = (state, action) => {
  return updateState(state, {
    tokenId: action.idToken,
    userId: action.localId,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updateState(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateState(state, { tokenId: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateState(state, { authRedirectPath: action.path });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state, action);
    case actionTypes.AUTH:
      return auth(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
