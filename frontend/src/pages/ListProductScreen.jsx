import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteProduct, listProducts } from "../services/ProductService";

const ListProductScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigator = useNavigate();

  const { data: allProducts, isLoading, refetch } = useQuery(
    "List Product",
    listProducts
  );

  if (isLoading) return <h1>Loading</h1>;

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container ">
        <h2 className="text-center">List of Product</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <button
          className="btn btn-primary m-2 "
          onClick={() => navigator("/add-product")}
          style={{ float: "right" }}
        >
          Add Product
        </button>
        <button
          className="btn btn-primary m-2 "
          onClick={() => navigator("/Dashboard")}
          style={{ float: "left" }}
        >
          Dashboard
        </button>
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {" "}
                  <img
                    src={"/images/" + product.imagepathe}
                    alt="Product Preview"
                    style={{ marginTop: "10px", maxWidth: "30%" }}
                  />
                </td>
                <td>{product.category.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      await deleteProduct(Number(product.id));
                      refetch();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => navigator(`/edit-product/${product.id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductScreen;
