/*
 * Actions triggered by the home page component to make api calls and return data
 */
import ActionKeys from "../shared/ActionKeys";

export const updateUsers = users => {
  return {
    type: ActionKeys.GET_USERS,
    payload: users
  };
};
