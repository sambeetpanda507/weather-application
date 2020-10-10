const express = require("express");
const { check } = require("express-validator");
const weatherController = require("../controller/weatherController");
const router = express.Router();
router.get("/", weatherController.getWeather);
router.post(
    "/",
    check("location", "Location field can't left empty").isAlpha(),
    weatherController.postWeather
);
router.get("/more-details", weatherController.getMoreDetails);
module.exports = router;
