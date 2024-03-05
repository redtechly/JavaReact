import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct, updateProduct } from "../services/ProductService";
import { listCategories } from "../services/CategoryService";

const ProductEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagepathe, setImagepathe] = useState("");
  const [category, setCategory] = useState(0);
  const navigator = useNavigate();
  const { id } = useParams();
  const { data: categories } = useQuery("List Categoty", () =>
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
        setImagepathe(data.imagepathe)
        setCategory(Number(data.category.id));
      },
    }
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagepathe(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // const saveProduct = async (e) => {
  //   e.preventDefault();
  //   await createProduct({ name, price, category });
  //   navigator("/list-product");
  // };

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
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Product Description"
                  name="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
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
                <label className="form-label">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="imagepathe"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagepathe && (
                  <img
                    src={imagepathe}
                    alt="Product Preview"
                    style={{ marginTop: '10px', maxWidth: '100%' }}
                  />
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
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
                  await updateProduct(id, { name, description, price, imagepathe, category });
                  navigator("/list-product");
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

export default ProductEdit;
