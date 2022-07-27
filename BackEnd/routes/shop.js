const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fileDataPath = path.join(__dirname, "..", "data", "storeFood.json");
const food = require("../data/storeFood.json")

router.get("/food", (req, res) => {
    fs.readFile(fileDataPath, (err, data) => {
        if(err){
            console.log(err.message);
            return;
        }
        const parsedJSON = JSON.parse(data);
        res.status(200).json(parsedJSON);
    
    })
})


module.exports = router;