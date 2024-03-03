import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteFood, listFoods } from "../services/FoodService";

const ListFoodComponent = () => {
  const navigator = useNavigate();

  const {
    data: allFood,
    isLoading,
    refetch,
  } = useQuery("List Food", () => listFoods());

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="container">
      <h2 className="text-center">List of Food</h2>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigator("/add-food")}
      >
        Add Food
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigator("/add-category")}
      >
        Add Category
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigator("/list-category")}
      >
        List Categories
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allFood.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.category.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    await deleteFood(Number(food.id));
                    refetch();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigator(`/edit-food/${food.id}`)}
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

export default ListFoodComponent;
