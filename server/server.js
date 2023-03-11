require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(cookieParser());


require('./config/mongoose.config');


require('./routes/user.routes')(app);


const server = app.listen(port, () => console.log("Listening on port: " + port));
