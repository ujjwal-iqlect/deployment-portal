import { SET_USER_LIST } from "../types";

export const deploymentReducer = (
  state = {
    userList: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };

    default:
      return { ...state };
  }
};
