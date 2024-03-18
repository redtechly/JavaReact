import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../services/CategoryService";
import { createProduct } from "../services/ProductService";
import { useQuery } from "react-query";

const ProductComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagepath, setImagepath] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("List Categoty", () => listCategories());

  const validate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (!imagepath.trim()) {
      errors.imagepath = "Image path is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await createProduct({
        name,
        description,
        price,
        imagepath,
        categoryName: category,
      });
      navigator("/list-product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagepath(file.name);
    }
  };

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error {error}</h1>;
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
          <h2 className="text-center">Add Product</h2>
          <div className="card-body">
            <form onSubmit={saveProduct}>
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
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Product Description"
                  name="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
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
                {errors.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Image:</label>
                <input
                  type="hidden"
                  name="imagepath"
                  value={imagepath}
                  className="form-control"
                ></input>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {errors.imagepath && (
                  <div className="text-danger">{errors.imagepath}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
                <select
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="text-danger">{errors.category}</div>
                )}
              </div>
              <button type="submit" className="btn btn-success">
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
