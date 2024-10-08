const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const cors = require("cors");
require('dotenv').config();
const AuthRouter = require("./routes/AuthRouter");
const StationRouter = require("./routes/StationRouter");
const DriverRouter = require("./routes/DriverRouter");
const bodyparser = require("body-parser");
const { createServer } = require("node:http")
const server = createServer(app);
const socket_io = require("socket.io");
const io = socket_io(server, {
  cors:{
    origin: 'http://localhost:5173'
  }
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded(true));
app.use(bodyparser.json());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('hello',()=>{
    console.log('hello connection check')
  })

  socket.on('requestUpdated', () => {
    console.log("requesting update");
      // Notify all connected clients about the update
      io.emit('updateStationDash');
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

server.listen(process.env.PORT || 5000, () => {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log(`MongoDB connected`))
      .catch(err => console.error(err));
    console.log(`Server running on port ${process.env.PORT}`);
  });

app.use("/users", AuthRouter);
app.use("/stations", StationRouter);
app.use("/drivers", DriverRouter);