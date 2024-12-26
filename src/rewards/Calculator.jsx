import React, { useEffect, useMemo, useState } from "react";
import "./calculator.css";
import { calculatePoints } from "../util/pointsCalculator";

export const fetchCustomerData =async () => {
  const response=await fetch('./customerData.json')
  const customerJSON=await response.json()
  return Promise.resolve(customerJSON.transactionData);
};

// Calcluate reward point per month
export const calculateRewards = (transactions) => {
  const rewardsObj = {};

  transactions.forEach((list) => {
    const { customerId, customerName, amount, date } = list;
    if (!amount || typeof amount !== "number" || isNaN(new Date(date))) {
      throw new Error("Invalid transaction data");
    }    
    const month = new Date(date).getMonth();
    const points = calculatePoints(amount);
    if (!rewardsObj[customerId]) {
      rewardsObj[customerId] = {
        name: customerName,
        months: { 9: 0, 10: 0, 11: 0 },
        total: 0,
      };
    }

    rewardsObj[customerId].months[month] += points;
    rewardsObj[customerId].total += points;
  });

  return rewardsObj;
};

const Calculator = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const loadCustomerTransactions = async () => {
      try {
        const data = await fetchCustomerData();
        setTransactions(data);
      } catch (err) {
        console.log("Failed to Fetch customer data");
      }
    };

    loadCustomerTransactions();
  }, []);

  // To recalculate rewards when transactions data changes
  const rewardsData = useMemo(() => {
    if (!transactions.length) return [];
    return calculateRewards(transactions);
  }, [transactions]);

  return (
    <div className="rewards-container">
      <h1 className="rewards-title">Customer Reward Summary</h1>
      <div className="container">
        <table className="rewards-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>October</th>
              <th>November</th>
              <th>December</th>
              <th>Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(rewardsData).map((list, idx) => (
              <tr key={idx}>
                <td>{list.name}</td>
                {Object.values(list.months).map((points, idx) => (
                  <td key={idx}>{points}</td>
                ))}
                <td className="total-points">{list.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calculator;
