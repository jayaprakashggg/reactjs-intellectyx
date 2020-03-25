/*
 * Store connector for footer and order details
 */
import { connect } from "react-redux";
import { HomePage } from "../components/home-page/HomePage";
import { updateUsers } from "../actions/HomePageActions";
import invokeAPI from "../services/InvokeAPI";
import { UserListEndpoint } from "../services/Endpoints";

/**
 * @function mapStateToProps
 * @param state: state values
 * @summary Takes the state of the store and passes it as props to the component
 */
export const mapStateToProps = state => {
  return state;
};

/**
 * @function mapDispatchToProps
 * @param dispatch: dispatch API call
 * @summary Dispatches action to store variables in redux store
 */
export const mapDispatchToProps = dispatch => ({
  fetchUsers: () => {
    return invokeAPI({
      endpoint: UserListEndpoint
    })
      .then((response: any) => {
        if (response && response.users) {
          dispatch(updateUsers({ users: response.users }));
        } else {
          dispatch(updateUsers({ users: null }));
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  updateUsers: users => {
    dispatch(updateUsers({ users: users }));
  }
});

// Connects props and action to HomePage component
const HomePageConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageConnector;
