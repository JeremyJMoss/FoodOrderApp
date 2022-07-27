const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/pageNotFound");

let port = process.env.PORT || 5000;

server.use(bodyParser.json());
server.use(cors());

server.use(shopRoutes);

server.use("/admin", adminRoutes);

server.use(errorRoute);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})