const mongoose = require("mongoose");

let Station = new mongoose.Schema(
    {
        station_name: String,
        station_type: String,
        location: {type: String, required: true},
        charging_points: Number,
        chargePointsAry: Array,
        operating_hours: String
    },
    {
        versionKey: false
    }
)

const StationModel = mongoose.model("StationColl", Station);

module.exports = {StationModel}