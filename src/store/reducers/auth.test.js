import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  let initState;
  beforeEach(() => {
    initState = {
      tokenId: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
  });

  it("should return the initial state if an unknown action is passed", () => {
    const state = reducer(undefined, { type: "DOES_NOT_EXIST" });
    expect(state).toEqual({
      tokenId: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the correct tokenId and userId upon user authentication", () => {
    const state = reducer(initState, {
      type: actionTypes.AUTH,
      idToken: "dummy token ID",
      localId: "dummy local ID",
    });

    expect(state).toEqual({
      tokenId: "dummy token ID",
      userId: "dummy local ID",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
