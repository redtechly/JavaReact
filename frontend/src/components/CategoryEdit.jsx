import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "../services/CategoryService";
import { useQuery } from "react-query";

const CategoryEdit = () => {
  const [name, setName] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();
  const { isLoading } = useQuery(
    ["Get Category", id],
    () => getCategory(Number(id)),
    {
      onSuccess: (data) => {
        setName(data.name);
      },
    }
  );

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="container">
      <br /> <br />
      <button
        className="btn btn-primary"
        onClick={() => navigator("/list-category")}
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

              <button
                className="btn btn-success"
                onClick={async (e) => {
                  e.preventDefault();
                  await updateCategory(id, { name });
                  navigator("/list-category");
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;
