const express = require("express");
const server = express();
const cors = require("cors");
const path = require("path")
const pathToStaticFolder = path.join(__dirname, "public");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/pageNotFound");

let port = process.env.PORT || 5000;

server.use(express.static(pathToStaticFolder))
server.use(express.json());
server.use(express.urlencoded({extended: true}))
server.use(cors());

server.use(shopRoutes);

server.use("/admin", adminRoutes);

server.use(errorRoute);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})