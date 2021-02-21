const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


app
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(cors());



app.use("/chat", require("./routes/single_chat"));
module.exports = app;