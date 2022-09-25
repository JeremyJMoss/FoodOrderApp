const express = require("express");
const router = express.Router();
const {render404Page} = require("../controllers/error");

router.use(render404Page);

module.exports = router;