import { render, screen } from "@testing-library/react";
import Calculator, { calculateRewards } from "../rewards/Calculator";
import { calculatePoints } from "../util/points";

describe("Calculator Component", () => {
  test("renders calculator component", () => {
    render(<Calculator />);
    const titleElement = screen.getByText(/Customer Reward Summary/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("calculates the points correctly", () => {
    expect(calculatePoints(120)).toBe(90);
  });

  test("returns -50 for 0 amount", () => {
    expect(calculatePoints(0)).toBe(-50); 
  });

  test("throws an error for non-numeric input", () => {
    expect(() => calculatePoints("abc")).toThrow();
    expect(() => calculatePoints(null)).toThrow();
    expect(() => calculatePoints(undefined)).toThrow();
  });

  test("returns empty object for no transactions", () => {
    const transactions = [];
    const result = calculateRewards(transactions);
    expect(result).toEqual({});
  });

  test("calculates rewards correctly for multiple customers", () => {
    const transactions = [
      { id: 1, customerId: 1, amount: 120, date: "2024-10-05", customerName: "User1" },
      { id: 2, customerId: 2, amount: 200, date: "2024-11-02", customerName: "User2" },
    ];
    const result = calculateRewards(transactions);
    expect(result).toEqual({                                                                  
      '1': { name: 'User1', months: { '9': 90, '10': 0, '11': 0 }, total: 90 }, 
      '2': { name: 'User2', months: { '9': 0, '10': 250, '11': 0 }, total: 250 }
    });
  });
  
  test("throws error for invalid transaction data", () => {
    const transactions = [
      { id: 1, customerId: 1, amount: "invalid", date: "2024-10-05", customerName: "User1" },
    ];
    expect(() => calculateRewards(transactions)).toThrow();
  });

  test("throws error for invalid date format", () => {
    const transactions = [
      { id: 1, customerId: 1, amount: 120, date: "invalid-date", customerName: "User1" },
    ];
    expect(() => calculateRewards(transactions)).toThrow();
  });    
  
});
