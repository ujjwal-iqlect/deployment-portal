import { combineReducers } from "redux";
import { deploymentReducer } from "./deploymentReducer";

const rootReducer = (state, action) => {
//   if (action.type === USER_LOGOUT) {
//     return appReducer(undefined, action);
//   }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  deploymentReducer,
});

export default rootReducer;
