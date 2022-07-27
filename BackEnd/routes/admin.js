const express = require("express");
const router = express.Router();
const {addMeal} = require("../controllers/meals");

router.post("/food", addMeal)

module.exports = router;