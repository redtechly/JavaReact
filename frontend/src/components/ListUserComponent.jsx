import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../services/UserService";
import LoadingBox from "./LoadingBox";

const ListUserComponent = () => {
  const navigator = useNavigate();

  const {
    data: Users,
    isLoading,
    refetch,
  } = useQuery("List User", () => listUsers());

  if (isLoading) return <LoadingBox></LoadingBox>;
  return (
    <div className="container">
      <h2 className="text-center">List of Users</h2>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    await deleteUser(Number(user.id));
                    refetch();
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigator(`/edit-user/${user.id}`)}
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

export default ListUserComponent;
