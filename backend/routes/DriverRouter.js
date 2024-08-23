const express = require("express");
const app = express();
const {publicStations, BookSlot, getPointsAry, BookInQueue, HomeCharging, AllBookings, AllLocations, getBids} = require("../controller/Driver/index")
const {requireAuth} = require("../middleware/jwtAuth");

app.use(requireAuth);

app.get('/public-stations', publicStations);
app.post('/book-slot', BookSlot);
app.get('/charge-points-data', getPointsAry);
app.post('/generate-request', BookInQueue);
app.post('/home-charging', HomeCharging);
app.get("/all-bookings", AllBookings);
app.get('/locations', AllLocations);
app.get('/get-bids', getBids)

module.exports = app;