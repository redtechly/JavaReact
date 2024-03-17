import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../css/permission.css";

const EditRole = () => {
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
      <Link to="/Dashboard" className="btn btn-primary">dashboard</Link>
        <div className="card">
          <div className="space">
            <Link to="/create-role" className="link">Create OR Assign</Link>
            <Link to="/assign-role" className="link">Assign role to user</Link>
            <Link to="/edit-role" className="link">Edit role name</Link>
            <Link to="/delete-role" className="link">Delete role</Link>
            <br />
          </div>
          <div className="card">
            <div className="action">Edit Role Name</div>

            <div className="card-body">
              {/* Display success message if any */}
              {sessionStorage.getItem('success') && (
                <div className="alert alert-success" role="alert">
                  {sessionStorage.getItem('success')}
                </div>
              )}

              <form method="POST" action="/admin/roles/editName">
                <div className="form-group">
                  <label htmlFor="name">Select Role</label>
                  <select name="name" className="form-control chosen-select">
                    {/* Render roles options here */}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="new_name">New Role Name</label>
                  <input type="text" name="new_name" className="form-control" required />
                </div>

                <button type="submit" className="btn btn-primary">Update Role Name</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
