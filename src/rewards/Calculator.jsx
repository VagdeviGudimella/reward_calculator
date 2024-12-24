import React, { useEffect, useMemo, useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchCustomerData =async () => {
    // User1-->[Oct:120,Oct:80,Oct:150]
    // User2-->[Oct:200,Oct:95,Nov:130]
    // User3-->[Nov:60,Nov:110,Dec:140]
    // User4-->[Dec:250,Dec:180,Dec:130]
    const response=await fetch('./customerData.json')
    const customerJSON=await response.json()
    return Promise.resolve(customerJSON.transactionData);
  };

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

  // Calculate reward points for a transaction
  const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += 2 * (amount - 100); // 2 points for every dollar spent over $100
      points += 50; // 1 point for every dollar spent between $50 and $100 in each transaction
    } else if (amount > 50) {
      points += amount - 50; // 1 point for every dollar spent between $50 and $100 in each transaction
    }
    return Math.floor(points);
  };

  // Calcluate reward point per month
  const calculateRewards = () => {
    const rewardsObj = {};

    transactions.forEach((list) => {
      const { customerId, customerName, amount, date } = list;
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

  // Only recalculate rewards when transactions data changes
  const rewardsData = useMemo(() => {
    if (!transactions.length) return [];
    return calculateRewards();
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
