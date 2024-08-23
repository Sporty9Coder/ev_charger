const { get } = require("mongoose");
const { StationModel } = require("../../models/StationModel");
const { BookingsModel } = require("../../models/BookingsModel");
const { BidsModel } = require('../../models/BidsModel')

async function publicStations(req,resp)
{
    try {
        const {station_type} = req.query;
        var publicstations;
        if(station_type !== 'instant charging')
        {
            publicstations = await StationModel.find({station_type: station_type});
        }
        console.log(publicstations);
        resp.json({status: true, resary: publicstations});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }
}

async function getPointsAry(req,resp) 
{
    const {id} = req.query;
    try {
        const station = await StationModel.findById(id);
        resp.json({status: true, ary: station.chargePointsAry})
    } catch (error) {
        console.log(error);
        resp.status(500).json({msg:error});
    }    
}

async function BookSlot(req,resp) 
{
    try {
        console.log(req.body);
        const { stationid, slotno, booking } = req.body;

        const station = await StationModel.findById(stationid);
        station.chargePointsAry[slotno] = {...station.chargePointsAry[slotno], status: 'booked'};

        const obj = await station.save();
        console.log(obj);

        const bookingObj = await BookingsModel.create({ 
            station_id: stationid,  
            user_id: booking.userid,
            model: booking.model,
            type: booking.type,
            company: booking.company,
            battery_capacity: booking.battery_capacity, 
            totalUnits: booking.totalUnits, 
            price: booking.price, 
            status: booking.status
        })
        console.log(bookingObj);

        resp.json({status: true, ary: obj.chargePointsAry, booking: bookingObj});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg:error})
    }
}

async function BookInQueue(req, resp) 
{
    console.log(req.body);
    try {
        const { stationid, booking } = req.body;

        const bookingObj = await BookingsModel.create({ 
            station_id: stationid,  
            user_id: booking.userid,
            model: booking.model,
            type: booking.type,
            company: booking.company,
            battery_capacity: booking.battery_capacity, 
            totalUnits: booking.totalUnits, 
            price: booking.price, 
            status: booking.status
        })
        console.log(bookingObj);

        resp.json({status: true, booking: bookingObj});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error})
    }    
}

async function HomeCharging(req, resp) 
{
    console.log("hello");
    console.log(req.body);
    try {
        const {homebooking} = req.body;
        console.log(homebooking);

        const bookingObj = await BookingsModel.create({  
            station_id: '',
            user_id: homebooking.userid,
            model: homebooking.model,
            type: homebooking.type,
            company: homebooking.company,
            battery_capacity: homebooking.battery_capacity, 
            totalUnits: homebooking.totalUnits, 
            price: 0,
            status: homebooking.status
        })
        console.log(bookingObj);

        resp.json({status: true, booking: bookingObj});

    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }
}

async function AllBookings(req,resp)
{
    const id = req.query.userid;
    console.log(id);
    try {
        const bookings = await BookingsModel.find({user_id : id});
        console.log(bookings);
        resp.json({status: true, ary: bookings});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }
}

async function AllLocations(req, resp) 
{
    try {
        const locations = await StationModel.distinct('location');
        resp.json({status: true, ary: locations})
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error})
    }    
}

async function getBids(req, resp)
{
    try {
        const bids = await BidsModel.find();
        resp.json({status: true, bids: bids});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error})
    }
}

module.exports = {publicStations, BookSlot, getPointsAry, BookInQueue, HomeCharging, AllBookings, AllLocations, getBids};