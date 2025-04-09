const mongoose = require('mongoose')

const conn = mongoose.connect(process.env.ATLAS_URL)

.then(db => {
    console.log("Database connected");
    return db;
}).catch(err =>{
    console.log("connection Error");
})

module.exports = conn;