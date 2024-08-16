const mongoose = require("mongoose");

const finalbid = new mongoose.Schema(
    {
        station_id: String,
        user_id: String,
        totalPrice: Number,
    },
    {
        versionKey: false
    }
)

const finalBidsModel = mongoose.model("finalBidsColl", finalbid);
module.exports = {finalBidsModel};