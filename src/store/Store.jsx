/* eslint-disable */
import { createStore } from "redux";

const initialState = {
  user: { login: false },
  refresh: true,
};
console.log(initialState,"initialState");
function reducer(state = initialState, action) {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };

    case "refresh":
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
}

export default createStore(reducer);
