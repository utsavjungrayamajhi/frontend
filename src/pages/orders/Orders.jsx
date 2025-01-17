import "./orders.css";
import { useEffect, useState } from "react";
import { getTokenFromCookies } from "../../cookieUtils";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const [txn, setTxn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies();

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://localhost:5000/api/orders/", {
          method: "GET",
          headers: {
            token: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();

        const filteredData = data.map((ord) => ({
          ID: ord.id,
          // Format the foodItems into a string
          foodItem: JSON.parse(ord.foodItems)
            .map((item) => `${item.name} (Qty: ${item.quantity})`)
            .join(", "), // Join the array of strings into a single string
          totalPrice: ord.totalPrice,
          status: ord.status,
        }));

        setTxn(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "ID", key: "ID" },
    { header: "Food Items", key: "foodItem" },
    { header: "Amount", key: "totalPrice" },
    { header: "Status", key: "status" },
  ];

  return (
    <div className="latestTransactions">
      <h1 className="latestTransactionsTitle">Order list</h1>

      <div className="latestTableContainer">
        <table className="latestTable">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="tableHeading">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {txn.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key} className="tableData">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
