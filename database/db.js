const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log(e);
})