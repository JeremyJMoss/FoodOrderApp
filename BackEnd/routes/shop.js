const express = require("express");
const router = express.Router();
const {getAllMeals} = require("../controllers/meals");

router.get("/food", getAllMeals)


module.exports = router;