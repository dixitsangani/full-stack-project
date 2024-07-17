const express = require("express");
const cors = require("cors")
const app = express(); // Corrected: declare app using const
const port = 8080;
app.use(express.json());
app.use(cors())

const productRoutes = require("./Routes/routes.product");
const { connection } = require("./db/db.connection");


const mogoose = require("mongoose");
 const db = require("./db/db.connection")


app.use("/routes", productRoutes)



app.listen(port, async () => {
    try {
        await connection;
    } catch (err) {
        console.log(err)
    }
    console.log("Server is running at port", port);
});
