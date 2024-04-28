import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/permission.css";

const AssignRoleToUserScreen = () => {
  // Mimic componentDidMount for jQuery initialization
  // useEffect(() => {
  //   $(".chosen-select").chosen({
  //     no_results_text: "Oops, nothing found!"
  //   });
  // }, []);

  return (
    <div>
      <title>Permission</title>
      <div className="cardBox">
        <Link to="/Dashboard" className="btn btn-primary">
          dashboard
        </Link>
        <div className="card">
          <div className="space">
            <Link to="/create-role" className="link">
              Create OR Assign
            </Link>
            <Link to="/assign-role" className="link">
              Assign role to user
            </Link>
            <Link to="/edit-role" className="link">
              Edit role name
            </Link>
            <Link to="/delete-role" className="link">
              Delete role
            </Link>
            <br />
          </div>
          <div className="card">
            <div className="action">Assign Role to User</div>

            <div>
              <form method="POST" action="/admin/assignRoleToUser">
                <div className="form-group">
                  <label htmlFor="role">Select Role</label>
                  <select name="role" className="form-control chosen-select">
                    {/* Render roles options here */}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Select User</label>
                  <select name="email" className="form-control chosen-select">
                    {/* Render users options here */}
                  </select>
                </div>

                <button type="submit">Assign Role</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleToUserScreen;
