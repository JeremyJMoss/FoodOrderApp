const fs = require("fs");
const path = require("path");
const fileDataPath = path.join(__dirname, "..", "data", "storeFood.json");

module.exports.addMeal = function(req, res) {
    fs.readFile(fileDataPath, (err, data) => {
        if (err){
            console.log(err.message);
            return;
        }
        const parsedJSON = JSON.parse(data);
        const newItem = req.body;
        if (!(newItem.name && newItem.description && newItem.price)){
            return res.status(400).json({message: "Please send name, description and price"});
        }

        if (Object.keys(newItem).length !== 3){
            return res.status(400).json({message: "Please send only name, description and price"});
        }

        if (isNaN(newItem.price)){
            return res.status(400).json({message: "Please enter valid price"})
        }
        const newobject = {id: `m${Number(parsedJSON[parsedJSON.length-1].id[1]) + 1}`, ...newItem}
        parsedJSON.push(newobject)
        fs.writeFile(fileDataPath, JSON.stringify(parsedJSON), (err) => {
            if(err){
                return console.log(err.message);
            }
            res.status(200).json(newobject);
        })
    })
}

module.exports.getAllMeals = function(req, res) {
    fs.readFile(fileDataPath, (err, data) => {
        if(err){
            console.log(err.message);
            return;
        }
        const parsedJSON = JSON.parse(data);
        res.status(200).json(parsedJSON);
    })
}