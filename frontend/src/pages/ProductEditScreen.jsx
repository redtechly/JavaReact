import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct, updateProduct } from "../services/ProductService";
import { listCategories } from "../services/CategoryService";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagepathe, setImagepathe] = useState("");
  const [category, setCategory] = useState(0);
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const navigator = useNavigate();
  const { id } = useParams();
  const { data: categories } = useQuery("List Category", () =>
    listCategories()
  );
  const { isLoading } = useQuery(
    ["Get Product", id],
    () => getProduct(Number(id)),
    {
      onSuccess: (data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(Number(data.price));
        setImagepathe(data.imagepathe);
        setCategory(Number(data.category.id));
      },
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagepathe(file.name);
    }
  };

  const validateInputs = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (price <= 0) {
      errors.price = "Price must be greater than zero";
    }

    if (category === 0) {
      errors.category = "Category is required";
    }

    if (!imagepathe) {
      errors.imagepathe = "Image is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      await updateProduct(id, {
        name,
        description,
        price,
        imagepathe,
        category,
      });
      navigator("/list-product");
    }
  };

  if (isLoading) return <h1>Loading</h1>;

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
          <h2 className="text-center">Update Product</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  name="name"
                  value={name}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
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
                />
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
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                {errors.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Image:</label>
                <input
                  type="hidden"
                  name="imagepathe"
                  value={imagepathe}
                  className="form-control"
                  onChange={(e) => setImagepath(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  name="imagepathe"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {errors.imagepathe && (
                  <div className="text-danger">{errors.imagepathe}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
                <select
                  value={category}
                  className="form-control"
                  onChange={(e) => setCategory(Number(e.target.value))}
                >
                  <option value={0} disabled>
                    Choose Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="text-danger">{errors.category}</div>
                )}
              </div>
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;
