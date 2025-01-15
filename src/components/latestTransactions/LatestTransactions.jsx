import "./latestTransactions.css";
import { useEffect, useState } from "react";
import { getTokenFromCookies } from "../../cookieUtils";
import { Link, useNavigate } from "react-router-dom";

export default function LatestTransactions() {
  const [txn, setTxn] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies();

        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await fetch("http://localhost:5000/api/payments/", {
          method: "GET",
          headers: {
            token: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        console.log(response.json());
        const filteredData = data.map((txn) => ({
          transactionId: txn.transactionId,
          orderId: txn.orderId,
          amount: txn.amount,
          paymentGateway: txn.paymentGateway,
          paymentDate: txn.createdAt.split("T")[0],
        }));
        console.log(filteredData);
        setTxn(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { header: "TransactionId", key: "transactionId" },
    { header: "OrderId", key: "orderId" },
    { header: "Amount", key: "amount" },
    { header: "Payment Gateway", key: "paymentGateway" },
    { header: "Payment Date", key: "paymentDate" },
  ];

  return (
    <div className="latestTransactions">
      <h3 className="latestTransactionsTitle">Latest Transactions</h3>
      {/* <Link to="/dashboard/addUser">
        <button className="addUserButton">Create</button>
      </Link> */}

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
