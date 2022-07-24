const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const path = require("path");

let port = process.env.PORT || 5000;

server.use(bodyParser.json());

server.use((req, res, next) => {
    res.setHeader
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
})

server.get("/hello-world", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

server.post("/food", (req, res) => {
    console.log(req.body);
    console.log("You hit the server");
    res.json(req.body).status(200).send();
})

server.use((req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "404.html"));
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})