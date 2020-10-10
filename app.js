const express = require("express");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const rootDir = require("./utils/helperFunction");
const errorController = require("./controller/errorController");
const weatherRouter = require("./router/weatherRouter");
const app = express();
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(weatherRouter);
app.use(errorController.get404);
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(
        chalk.green.inverse(`server listening on port http://localhost:${port}`)
    );
});
