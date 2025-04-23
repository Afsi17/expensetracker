const express = require("express");
const router = express.Router();
const Expenses = require("../models/Expenses");

//ADD EXPENSE

router.post("/", async (req, res) => {
  // console.log(req.body);   //Debugging step to check the incoming request data
  try {
    const newExpenses = await Expenses(req.body);
    const expense = newExpenses.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json(error);
  }
});

//GET ALL EXPENSES

router.get("/", async (req, res) => {
  try {
    const expense = await Expenses.find().sort({ createdAt: 1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE EXPENSE

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expenses.findByIdAndUpdate(
      //finds an id to update
      req.params.id, //extracts the id from url
      {
        $set: req.body, //updates only the field needed to update rather than updating whole
      },
      { new: true } //ensures the updated value is returned
    );
    res.status(200).json(expense); //sends response if success & sends updated data as json
  } catch (error) {
    res.status(500).json(error); //if any error occurs sends error 500
  }
});

//DELETE AN EXPENSE

router.delete("/:id", async (req, res) => {
  try {
    await Expenses.findByIdAndDelete(req.params.id);
    res.status(201).json("Data Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
