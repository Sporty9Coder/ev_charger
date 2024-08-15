const express = require("express");
const app = express();
const {publicStations, BookSlot, getPointsAry, BookInQueue, HomeCharging} = require("../controller/Driver/index")
const {requireAuth} = require("../middleware/jwtAuth");

app.use(requireAuth);

app.get('/public-stations', publicStations);
app.post('/book-slot', BookSlot);
app.get('/charge-points-data', getPointsAry);
app.post('/generate-request', BookInQueue);
app.post('/home-charging', HomeCharging);

module.exports = app;