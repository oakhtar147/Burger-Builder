import * as actionTypes from "../actions/actionTypes";
import { updateObject as updateState } from "../utility";

const initState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
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
    default:
      return state;
  }
};

export default reducer;
