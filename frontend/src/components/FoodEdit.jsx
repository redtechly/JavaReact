import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getFood, updateFood } from "../services/FoodService";
import { listCategories } from "../services/CategoryService";

const FoodEdit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const navigator = useNavigate();
  const { id } = useParams();
  const { data: categories } = useQuery("List Categoty", () =>
    listCategories()
  );
  const { isLoading } = useQuery(["Get Food", id], () => getFood(Number(id)), {
    onSuccess: (data) => {
      setName(data.name);
      setPrice(Number(data.price));
      setCategory(Number(data.category.id));
    },
  });
  // const saveFood = async (e) => {
  //   e.preventDefault();
  //   await createFood({ name, price, category });
  //   navigator("/list-food");
  // };

  if (isLoading) return <h1>Loading</h1>;
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
          <h2 className="text-center">Update Food</h2>
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
                  defaultValue={category}
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
              <button
                className="btn btn-success"
                onClick={async (e) => {
                  e.preventDefault();
                  await updateFood(id, { name, price, category });
                  navigator("/list-food");
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

export default FoodEdit;
