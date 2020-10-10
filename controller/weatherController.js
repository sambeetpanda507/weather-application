const fetch = require("node-fetch");
const chalk = require("chalk");
const { validationResult } = require("express-validator");
require("dotenv");
module.exports.getWeather = (req, res, next) => {
    res.render("weather/weather", {
        docTitle: "Weather page",
        path: "/",
        json: null,
        errorMessage: undefined,
    });
};

module.exports.postWeather = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(422).render("weather/weather", {
            docTitle: "Weather page",
            path: "/",
            json: null,
            errorMessage: error.array()[0].msg,
        });
    }
    // const loc = req.body.location;
    req.session.loc = req.body.location;
    if (!req.session.loc) {
        return res.redirect("/");
    }
    const apiKey = process.env.API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${req.session.loc}`;
    let settings = { method: "Get" };
    fetch(url, settings)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if (json.error) {
                return res.render("weather/weather", {
                    docTitle: "current weather",
                    path: "/",
                    json: null,
                    errorMessage: json.error.message,
                });
            }
            res.render("weather/weather", {
                docTitle: "current weather",
                path: "/",
                json: json,
                errorMessage: undefined,
            });
        })
        .catch((err) => console.log(err));
};

module.exports.getMoreDetails = (req, res, next) => {
    const location = req.session.loc;
    if (!location) {
        return res.redirect("/");
    }
    const apiKey = process.env.API_KEY;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${req.session.loc}&days=3`;
    let settings = { method: "Get" };
    fetch(url, settings)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if (json.error) {
                console.log(json.error.message);
                return res.render("weather/weather", {
                    docTitle: "current weather",
                    path: "/",
                    json: null,
                    errorMessage: json.error.message,
                });
            }
            res.render("weather/more-details", {
                docTitle: "more details",
                path: "/more-details",
                json: json,
            });
        })
        .catch((err) => console.log(err));
};
