import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../services/CategoryService";
import { createProduct } from "../services/ProductService";
import { useQuery } from "react-query";

const ProductComponent = () => {
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
  const saveProduct = async (e) => {
    e.preventDefault();
    await createProduct({ name, price, category });
    navigator("/list-product");
  };

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error {error}</h1>;
  return (
    <div className="container">
      <br /> <br />
      <button
        className="btn btn-primary"
        onClick={() => navigator("/list-product")}
      >
        Go Back
      </button>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add Product</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
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
                  placeholder="Enter Product Price"
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
              <button className="btn btn-success" onClick={saveProduct}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
