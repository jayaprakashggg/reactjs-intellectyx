// Reducer to maintain the store for the user list
import ActionKeys from "../shared/ActionKeys";

// Initial store value
export const initialState = {
  users: null
};

/**
 * @function homePageReducer
 * @param state current state
 * @param action action to be executed, triggered in the connector
 */
export let homePageReducer = (
  state = initialState,
  action = { type: null, payload: null }
) => {
  switch (action.type) {
    case ActionKeys.GET_USERS:
      return {
        ...state,
        users: action.payload.users
      };
    default:
      return state;
  }
};
