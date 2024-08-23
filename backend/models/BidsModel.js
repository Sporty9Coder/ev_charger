const mongoose = require("mongoose");

let bid = new mongoose.Schema(
    {
        speed: String,
        price: Number,
        status: String,
        station_id: String,
        station_name: String,
        location: String
    },
    {
        versionKey: false
    }
);

const BidsModel = mongoose.model("BidsColl", bid);

module.exports = { BidsModel };