import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../services/CategoryService";
import { createCategory } from "../services/CategoryService";
import { useQuery } from "react-query";

const CategoryComponent = () => {
  const [name, setName] = useState("");
  const navigator = useNavigate();
  const saveCategory = async (e) => {
    e.preventDefault();
    await createCategory({ name });
    navigator("/list-category");
  };

  return (
    <div className="container">
      <br /> <br />
      <button
        className="btn btn-primary"
        onClick={() => navigator("/Dashboard")}
      >
        Go Back
      </button>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add Category</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  name="name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <button className="btn btn-success" onClick={saveCategory}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
