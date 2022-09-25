const express = require("express");
const router = express.Router();
const {addMeal} = require("../controllers/meals");
const {renderAdminProductPage} = require("../controllers/addProduct");

router.post("/food", addMeal)

router.use("/addproduct", renderAdminProductPage);

module.exports = router;