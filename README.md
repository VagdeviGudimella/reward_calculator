# Customer Rewards Program

## **Description**
This project calculates customer reward points based on purchase amounts using the following rules:
- **2 points** for every dollar spent over **$100**.
- **1 point** for every dollar spent between **$50 and $100**.

For example, a **$120** purchase earns:
- 2 points for 20 dollars over $100 = **40 points**
- 1 point for 50 dollars between $50 and $100 = **50 points**
- **Total = 90 points**
---

## **Technologies Used**
- **React.js**
- **JavaScript**, **HTML/CSS**

---

## **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/VagdeviGudimella/reward_calculator.git
   cd reward_calculator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000/`.

---

## **Features**
- View customer reward points per month and total points.
- Simulated API call to fetch transaction data.

---

## **Data Example**
```javascript
[
  { "id": 1, "customerId": 1, "amount": 120, "date": "2024-10-05", "customerName": "User1" },
  { "id": 2, "customerId": 2, "amount": 80, "date": "2024-11-15", "customerName": "User2" }
]
```

---

## **Reward Calculation**
- **$50 or less**: No points.
- **$50 - $100**: 1 point for each dollar.
- **Over $100**: 2 points for each dollar.

---
