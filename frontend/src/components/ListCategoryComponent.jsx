import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteCategory, listCategories } from "../services/CategoryService";

const ListCategoryComponent = () => {
  const navigator = useNavigate();

  const {
    data: allCategory,
    isLoading,
    refetch,
  } = useQuery("List Category", () => listCategories());

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="container">
      <h2 className="text-center">List of Categories</h2>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigator("/add-category")}
        style={{ float: "right" }}
      >
        Add Category
      </button>
      <button
        className="btn btn-primary m-2 "
        onClick={() => navigator("/Dashboard")}
        style={{ float: "left" }}
      >
        dashboard
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCategory.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    await deleteCategory(Number(category.id));
                    refetch();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigator(`/edit-category/${category.id}`)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategoryComponent;
