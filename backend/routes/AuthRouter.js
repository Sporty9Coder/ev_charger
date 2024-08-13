const express = require("express");
const { Signin, Login } = require("../controller/Auth");
const app = express();

app.post('/signin', Signin);
app.post('/login', Login);

module.exports = app;