import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../css/permission.css";

const DeleteRole = () => {
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
        <div className="card">
          <div className="space">
            <Link to="/create-role" className="link">Create OR Assign</Link>
            <Link to="/assign-role" className="link">Assign role to user</Link>
            <Link to="/edit-role" className="link">Edit role name</Link>
            <Link to="/delete-role" className="link">Delete role</Link>
            <br />
          </div>
          <div className="card">
            <div className="action">Delete Role</div>

            <div className="card-body">
              {/* Display success message if any */}
              {sessionStorage.getItem('success') && (
                <div className="alert alert-success" role="alert">
                  {sessionStorage.getItem('success')}
                </div>
              )}

              <form method="POST" action="/admin/roles/delete">
                <div className="form-group">
                  <label htmlFor="name">Select Role</label>
                  <select name="name" className="form-control chosen-select">
                    {/* Render roles options here */}
                  </select>
                </div>

                <button type="submit" className="btn btn-danger">Delete Role</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRole;
