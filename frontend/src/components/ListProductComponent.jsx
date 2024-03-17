import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteProduct, listProducts } from "../services/ProductService";
import Dashboard from "../pages/Dashboard";

const ListProductComponent = () => {
  const navigator = useNavigate();

  const {
    data: allProduct,
    isLoading,
    refetch,
  } = useQuery("List Product", () => listProducts());

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div >
    
    <div className="container ">
      <h2 className="text-center">List of Product</h2>
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
        dashboard
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
          {allProduct.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td> <img
                    src={"../../images/"+product.imagepathe}
                    alt="Product Preview"
                    style={{ marginTop: '10px', maxWidth: '30%' }}
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

export default ListProductComponent;
