const express = require("express");
const app = express();
const {AddStation, FetchAllStation, setChargePointsData,fetchPointsData, PendingBookings, ApproveRequest, AllBookings} = require("../controller/Station/index")
const {requireAuth} = require("../middleware/jwtAuth");

app.use(requireAuth);

app.post("/add-station", AddStation);
app.get("/fetch-stations", FetchAllStation);
app.post("/charge-points-data", setChargePointsData);
app.get('/fetch-points-data', fetchPointsData)
app.get('/pending-bookings', PendingBookings)
app.post('/approve-request', ApproveRequest)
app.get('/all-bookings', AllBookings)

module.exports = app;