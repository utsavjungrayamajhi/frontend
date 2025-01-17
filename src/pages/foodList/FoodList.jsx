import "./foodList.css";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getTokenFromCookies } from "../../cookieUtils";

export default function FoodList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies();

        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await fetch("http://localhost:5000/api/foods/", {
          method: "GET",
          headers: {
            token: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();

        const filteredData = data.map((food) => ({
          id: food.id,
          name: food.name,
          price: food.price,
          category: food.category,
          available: food.available ? "Yes" : "No",
        }));

        setFoods(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "Name", key: "name" },
    { header: "Price", key: "price" },
    { header: "Category", key: "category" },
    { header: "Available", key: "available" },
  ];

  const navigate = useNavigate();
  const handleEdit = (row) => {
    navigate("/dashboard/editFood", { state: { rowData: row } });
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const token = getTokenFromCookies();

      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/foods/${id}`, {
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
      <div className="userListsTitle">
        <h1>Foods</h1>
        <Link to="/dashboard/addFood">
          <button className="addUserButton">Add</button>
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
          {foods.map((row, index) => (
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
                  onClick={() => handleDelete(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
