import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../css/permission.css";

const CreateRole = () => {
  // Mimic componentDidMount for jQuery initialization
  // useEffect(() => {
  //   $(".chosen-select").chosen({
  //     no_results_text: "Oops, nothing found!"
  //   });
  // }, []);

  return (
    <div>
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
            <div className="action">Create Or Assign</div>

            <form method="POST" action="/admin/roles">
              <div className="form-group">
                <label htmlFor="role">Select Role</label>
                <input list="namelist" name="name" id="name" />
                <datalist id="namelist">
                  {/* Render roles options here */}
                </datalist>
              </div>

              <div className="form-group">
                <label htmlFor="permissions">Assign Permissions</label>
                <select name="permissions[]" className="form-control chosen-select" multiple>
                  {/* Render permissions options here */}
                </select>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Create OR Assign</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
