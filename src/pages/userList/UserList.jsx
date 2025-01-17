import "./userList.css";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getTokenFromCookies } from "../../cookieUtils";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies();

        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await fetch("http://localhost:5000/api/users/find", {
          method: "GET",
          headers: {
            token: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();

        const filteredData = data.map((user) => ({
          ID: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          createdAt: user.createdAt.split("T")[0],
        }));
        setUsers(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Created At", key: "createdAt" },
  ];

  const navigate = useNavigate();
  const handleEdit = (row) => {
    navigate("/dashboard/editUser", { state: { rowData: row } });
  };

  const handleDelete = async (id) => {
    try {
      const token = getTokenFromCookies();

      if (!token) {
        console.log("No token found");
        return;
      }
      const currentUser = JSON.parse(atob(token.split(".")[1]));
      if (id === currentUser.id) {
        alert("You cannot delete your own account.");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          token: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete the data");
    }
  };

  return (
    <div className="userLists">
      {users && users.length > 0 ? (
        <>
          <div className="userListsTitle">
            <h1>Users</h1>
            <Link to="/dashboard/addUser">
              <button className="addUserButton">Create</button>
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="tableHeading">
                    {col.header}
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.key} className="tableData">
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="action">
                    <button className="edit" onClick={() => handleEdit(row)}>
                      Edit
                    </button>

                    <DeleteOutline
                      className="delete"
                      onClick={() => handleDelete(row.ID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h3>You cannot access this section !</h3>
      )}
    </div>
  );
}
