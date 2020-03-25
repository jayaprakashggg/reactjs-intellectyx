import * as React from "react";
import { withRouter } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import "./HomePage.scss";
import invokeAPI from "../../services/InvokeAPI";
import { UserListEndpoint, UserSearchEndpoint } from "../../services/Endpoints";

/**
 * @function HomePage
 * @summary Renders the home page component
 */
export function HomePage(props) {
  console.log("props", props);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [status, setStatus] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditID] = useState(null);

  // Set the search to the state
  const handleChangeSearch = useCallback(event => {
    setSearch(event.target.value);
  }, []);

  // Set the name to the state
  const handleChangeName = useCallback(event => {
    setName(event.target.value);
  }, []);

  // Set the shop name to the state
  const handleChangeShop = useCallback(event => {
    setShop(event.target.value);
  }, []);

  // Set the status to the state
  const handleChangeStatus = useCallback(event => {
    setStatus(event.target.value);
  }, []);

  // Function fired when the user click search button
  const handleSearchButton = () => {
    invokeAPI({
      method: "GET",
      endpoint: UserSearchEndpoint + search
    }).then((response: any) => {
      setSearch("");
      props.updateUsers(response.users);
    });
  };

  // Function fired when the user click submit button
  const handleSubmit = () => {
    if (isEdit) {
      invokeAPI({
        method: "PUT",
        endpoint: UserListEndpoint + editId,
        data: {
          name: name,
          shop_name: shop,
          status: status,
          created_by: "User",
          modified_by: "User"
        }
      }).then((response: any) => {
        setName("");
        setShop("");
        setStatus("");
        setEdit(false);
        props.fetchUsers();
      });
    } else {
      invokeAPI({
        method: "POST",
        endpoint: UserListEndpoint,
        data: {
          name: name,
          shop_name: shop,
          status: status,
          created_by: "User",
          modified_by: "User"
        }
      }).then((response: any) => {
        setName("");
        setShop("");
        setStatus("");
        props.fetchUsers();
      });
    }
  };

  // Function fired when the user click cancel button
  const handleCancel = () => {
    setName("");
    setShop("");
    setStatus("");
    setEdit(false);
  };

  const editUser = index => {
    setName(props.users[index].name);
    setShop(props.users[index].shop_name);
    setStatus(props.users[index].status);
    setEdit(true);
    setEditID(props.users[index]._id);
  };

  const deleteUser = index => {
    invokeAPI({
      method: "DELETE",
      endpoint: UserListEndpoint + props.users[index]._id
    }).then((response: any) => {
      props.fetchUsers();
    });
  };

  useEffect(() => {
    if (!props.users) {
      props.fetchUsers();
    }
  });

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 p-5">
            <div className="example">
              <input
                placeholder="Search..."
                type="text"
                name="quantity"
                id="quantity"
                value={search}
                onChange={handleChangeSearch}
              />
              <button type="submit" onClick={handleSearchButton}>
                Search
              </button>
            </div>
            <div className="m-t-20">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.users &&
                    props.users.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.name}</td>
                          <td>{data.status}</td>
                          <td>{data.modified_date}</td>
                          <td>
                            <button
                              className="btn btn-info m-l-r-10"
                              onClick={editUser.bind(this, index)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger m-l-r-10"
                              onClick={deleteUser.bind(this, index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-4 p-5">
            <div className="container">
              <h2>{isEdit ? "Edit" : "Add"} user details</h2>
              <div className="form-group">
                <label>
                  <strong>Name:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChangeName}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Shop Name:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shop-name"
                  name="shop-name"
                  value={shop}
                  onChange={handleChangeShop}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={status}
                  onChange={handleChangeStatus}
                />
              </div>
              <button onClick={handleSubmit} className="btn btn-success">
                Submit
              </button>
              {isEdit && (
                <button
                  onClick={handleCancel}
                  className="btn btn-success m-l-10"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(HomePage);
