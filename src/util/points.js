/**
 * Calculate points based on the amount spent.
 * @param {number} amount - The total amount spent.
 * @returns {number} - The calculated points.
 */
export const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += 2 * (amount - 100); // 2 points for every dollar spent over $100
      points += 50; // 1 point for every dollar spent between $50 and $100 in each transaction
    } else if (amount > 50) {
      points += amount - 50; // 1 point for every dollar spent between $50 and $100 in each transaction
    }
    return Math.floor(points);
  };
  