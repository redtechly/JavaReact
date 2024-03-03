import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../services/CategoryService";
import { createFood } from "../services/FoodService";
import { useQuery } from "react-query";

const FoodComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const navigator = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("List Categoty", () => listCategories());
  const saveFood = async (e) => {
    e.preventDefault();
    await createFood({ name, price, category });
    navigator("/list-food");
  };

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error {error}</h1>;
  return (
    <div className="container">
      <br /> <br />
      <button
        className="btn btn-primary"
        onClick={() => navigator("/list-food")}
      >
        Go Back
      </button>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add Food</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Food Name"
                  name="name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Price:</label>
                <input
                  type="number"
                  placeholder="Enter Food Price"
                  name="price"
                  value={price}
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setPrice(0);
                    } else {
                      setPrice(Number(e.target.value));
                    }
                  }}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <select
                  defaultValue=""
                  className="form-control"
                  onChange={(e) => setCategory(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-success" onClick={saveFood}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodComponent;
