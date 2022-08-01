const express = require("express");
const router = express.Router();
const {getAllMeals} = require("../controllers/meals");
const {postOrderDetails} = require("../controllers/orders");

router.get("/food", getAllMeals)

router.post("/order-details", postOrderDetails)

module.exports = router;