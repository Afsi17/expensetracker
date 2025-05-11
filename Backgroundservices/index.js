const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expenseEmail = require("./EmailService/Expense");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESFULLY");
  })
  .catch((err) => {
    console.log(err);
  });

//Schedule function.
const runSchedule = () => {
  cron.schedule("* * * * *", () => {
    //console.log("Hello I am running every minute!");
    // Add your task logic here
    expenseEmail();
  });
};

runSchedule(); // Call the function to start the cron job

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
});
