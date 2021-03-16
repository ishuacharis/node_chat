const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("./auth/passport")

app
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(cors());


app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

app.use("/chat", require("./routes/single_chat"));
app.use("/adduser", require("./routes/adduser"));
app.use("/friends", require("./routes/getFriends"));
module.exports = app;