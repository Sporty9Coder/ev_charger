const mongoose = require("mongoose");

let booking = new mongoose.Schema(
    {
        station_id: String,
        user_id: String,
        model: String,
        type: String,
        company: String,
        battery_capacity: Number, 
        totalUnits: Number,
        price: Number,
        status: String
    },
    {
        versionKey: false
    }
);

const BookingsModel = mongoose.model("BookingsColl", booking);

module.exports = {BookingsModel};