import { Document, Model } from "mongoose";

export const generateLast12MonthsData = async (model) => {
  const last12Months = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);// Add 1 day to the current date to start from the next day.

  for (let i = 11; i >= 0; i--) { // calculates the end date for current month
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );

    // Calculate the start date for the current month.
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    // Format the end date as a string 
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Query the database to count documents created between "startDate" and "endDate."
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // Add an object to the "last12Months" array with the month/year and the count.
    last12Months.push({ month: monthYear, count });
  }

  // Return an object containing the last 12 months' data.
  return { last12Months };
};
