import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../services/CategoryService";
import { createProduct } from "../services/ProductService";
import { useQuery } from "react-query";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
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
      setErrors({ name: "Name is required", ...errors });
    }
    if (!description.trim()) {
      setErrors({ description: "Description is required", ...errors });
    }
    if (price <= 0) {
      setErrors({ price: "Price must be greater than 0", ...errors });
      errors.price = "Price must be greater than 0";
    }

    if (!category) {
      setErrors({ category: "Category is required", ...errors });
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("categoryName", category);
      formData.append("image", image);
      await createProduct(formData);
      navigator("/list-product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "" });
      setImage(file);
    } else {
      setErrors({ ...errors, image: "File should be image" });
      e.target.files = null;
      e.target.value = null;
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
                  name="image"
                  value={image}
                  className="form-control"
                ></input>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
                <select
                  defaultValue=""
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
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

export default CreateProduct;
