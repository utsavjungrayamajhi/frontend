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
          name: ord.customerName,
          hall: ord.hall,
          seat: ord.seat,
          // Format the foodItems into a string
          foodItem: JSON.parse(ord.foodItems)
            .map((item) => `${item.name} (Qty: ${item.quantity})`)
            .join(", "), // Join the array of strings into a single string
          totalPrice: ord.totalPrice,
          status: ord.status,
          delivered: ord.delivered === "delivered",
        }));

        setTxn(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeliveryChange = async (id, delivered) => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          delivered: delivered ? "delivered" : "pending",
        }),
      });

      setTxn((prevTxn) =>
        prevTxn.map((order) =>
          order.ID === id ? { ...order, delivered } : order
        )
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "ID", key: "ID" },
    { header: "Name", key: "name" },
    { header: "Hall", key: "hall" },
    { header: "Seat", key: "seat" },
    { header: "Food Items", key: "foodItem" },
    { header: "Amount", key: "totalPrice" },
    { header: "Payment", key: "status" },
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
              <th>Delivered</th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={row.delivered}
                    onChange={(e) => {
                      handleDeliveryChange(row.ID, e.target.checked);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
