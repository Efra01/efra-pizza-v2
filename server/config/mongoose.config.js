const mongoose = require('mongoose');
const db_name = "pizzatime";


mongoose.connect("mongodb://localhost/" + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connected to the " + db_name + " database"))
    .catch((err) => {
        console.log("Something went wrong while connecting with the database " + db_name + ": ")
        console.log(err);   
    });
