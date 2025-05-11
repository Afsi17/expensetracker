const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expenses");

dotenv.config();

const expenseEmail = async () => {
  const expenses = await Expense.find(); //You get all expense documents from MongoDB using Mongoose.
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  if (totalExpense > 10000) {
    let messageOption = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "WARNING: EXPENSES EXCEED 10,000",
      text: `Your Total Expenses have exceeded 10,000. You're current expense is ${totalExpense}. Please review your Tracker for further details.`,
    };
    await sendMail(messageOption);
  }
};

module.exports = expenseEmail;
//This is where the logic behind sending the automated email is coded.
