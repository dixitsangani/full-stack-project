const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/fullstackpro")

const db = mongoose.connection.once("open", (err) => {
    if (err) {
        console.log("no")
        return false
    }
    console.log("db ok")
})

module.exports = db;