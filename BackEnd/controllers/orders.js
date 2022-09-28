const fs = require("fs");
const path = require("path");

const pathToOrderDetails = path.join(__dirname, "..", "data", "orderDetails.json");

const userDetailFields = ["city", "firstName", "lastName", "street", "postCode", "state"];

const foodOrderItemFields = ["name", "amount", "price"];

const STATES = ["ACT", "NSW", "WA", "SA", "TAS", "QLD", "NT"];

const isEmptyString = input => input.trim() === "";

const checkPostcode = input => input.match(/^\d{4}$/);

const checkState = input => STATES.includes(input.toUpperCase());

module.exports.postOrderDetails = function(req, res){
    // checking for valid fields passed in
    if (!Object.keys(req.body).includes("userDetails") || 
        !Object.keys(req.body).includes("foodOrder") || 
        !Object.keys(req.body) === 2 ||
        typeof req.body.userDetails !== "object" ||
        !Array.isArray(req.body.foodOrder)){
            return res.status(400).json({message: "Invalid Request"})
    }

    

    const userDetails = req.body.userDetails;

    for (let field of Object.keys(userDetails)){
        //seeing if the fields passed in match the field names required
        if (!userDetailFields.includes(field)){
            return res.status(400).json({message: `${field} is not a supported field`})
        }
        //checking if the first 4 field names in userDetailFields array are empty strings
        if (userDetailFields.slice(0,3).includes(field)){
            if (isEmptyString(userDetails[field])){
                return res.status(400).json({message: `${field} cannot be empty`});
            }
        }
        //checking if postcode is correct
        if (field === userDetailFields[4]){
            if(!checkPostcode(userDetails[field])){
                return res.status(400).json({message: `${field} cannot be empty and has to be a valid postcode`})
            }
        }
        //checking if state is a valid state
        if (field === userDetailFields[5]){
            if(!checkState(userDetails[field])){
                return res.status(400).json({message: `${field} cannot be empty and has to be a valid state`})
            }
        }
    }
    
    const foodOrder = req.body.foodOrder;

    // checking if food has been added to foodOrder array
    if (foodOrder.length == 0){
        return res.status(400).json({message: "No food has been added to order"});
    }

    for (let item of foodOrder){
        for (let field in item){
            if (!foodOrderItemFields.includes(field)){
                return res.status(400).json({message: `${field} is not a valid food order field`});
            }
            if (field === foodOrderItemFields[0] && isEmptyString(item[field])){
                return res.status(400).json({message: `${field} cannot be empty`});
            }
            if (field === foodOrderItemFields[1] && typeof item[field] != "number" && item[field] < 1 ){
                return res.status(400).json({message: `${field} cannot be less than 1`});
            }
            if (field === foodOrderItemFields[2] && typeof item[field] != "number" && item[field] <= 0){
                return res.status(400).json({message: `${field} cannot be less than or equal to 0`});
            }
        }
    }    

    try{    
        fs.access(pathToOrderDetails, fs.constants.F_OK, (err) => {
            if (err){
                fs.writeFile(pathToOrderDetails, "[]", (err) => {
                    if(err){
                        throw new Error(err.message);
                    }
                    console.log("created orderDetails file for the first time");
                })
            }
        })
        fs.readFile(pathToOrderDetails, (err, data) => {
            if (err){
                    throw new Error(err.message);
                }
            const currentStoredOrderDetails = JSON.parse(data);
            const newCurrentStoredOrders = [...currentStoredOrderDetails, req.body];
            fs.writeFile(pathToOrderDetails, JSON.stringify(newCurrentStoredOrders), (err) => {
                if(err){
                    throw new Error(err.message);
                }
                return res.status(200).json({message: "Successfully Sent Order!"});
            })                    
        })
    }
    catch(err){
        return res.status(400).json({message: `${err.message}`});
    }
}