const fs = require("fs");
const path = require("path");

const pathToOrderDetails = path.join(__dirname, "..", "data", "orderDetails.json");

const userDetailFields = ["city", "firstName", "lastName", "postcode", "state", "street"];

const foodOrderItemFields = ["id", "name", "amount", "price"];

const STATES = ["ACT", "NSW", "WA", "SA", "TAS", "QLD", "NT"];

const checkForEmptyString = input => input.trim() !== "";

const checkPostcode = input => checkForEmptyString(input) && input.match(/^\d{4}$/);

const checkState = input => checkForEmptyString(input) && STATES.includes(input.toUpperCase());

module.exports.postOrderDetails = function(req, res){
    // checking for valid fields passed in
    if (!("userDetails" in req.body) || 
        !("foodOrder" in req.body) || 
        Object.keys(req.body) !== 2 ||
        typeof req.body.userDetails !== "object" ||
        Array.isArray(!req.body.foodOrder)){
            return res.status(400).json({message: "Invalid Request"})
    }

    const userDetails = req.body.userDetails;

    if (Object.keys(userDetails).length !== 6){
        return res.status(400).json("Invalid Request")
    }
    Object.keys(userDetails).forEach((key) => {
        if (!userDetailFields.includes(key)){
            return res.status(400).json({message: `${key} is not a supported field`})
        }
    })

    const foodOrder = req.body.foodOrder;

    foodOrder.forEach(item => {
        // check item keys are in food order item details
    })
    
    fs.access(pathToOrderDetails, (err) => {
        if (err){
            fs.writeFile(pathToOrderDetails, "[]", (err) => {
                if(err){
                    console.error(err);
                    return;
                }
                console.log("created orderDetails file for the first time");
            })
        }
        fs.readFile(pathToOrderDetails, (err, data) => {
            if (err){
                console.error(err);
                return;
            }

            const currentStoredOrderDetails = JSON.parse(data);
            
            

            

            
        })

    })
}