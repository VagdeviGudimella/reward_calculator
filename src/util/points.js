/**
 * Calculate points based on the amount spent.
 * @param {number} amount - The total amount spent.
 * @returns {number} - The calculated points.
 */
export const calculatePoints = (amount) => {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Invalid amount");
  }
    let points= amount>100?2*(amount-100)+50:amount-50  
    return Math.floor(points);
  };
  