const mongoose = require("mongoose");

let user = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        mobile: String,
        usertype: String
    },
    {
        versionKey: false
    }
)
const UserModel = mongoose.model("UsersColl", user);

module.exports = UserModel;