const { StationModel } = require("../../models/StationModel");
const { BookingsModel } = require("../../models/BookingsModel")
const { BidsModel } = require('../../models/BidsModel')

async function AddStation(req,resp)
{
    try {
        console.log(req.body);
        const station = new StationModel(req.body);
        const newstation = await station.save();
        resp.json({status: true, station: newstation});
    } catch (error) {
        console.log(error);
        resp.status(500).json({status: false, msg: error})
    }
}

async function FetchAllStation(req,resp)
{
    try {
        // console.log("fetching alll stations");
        const stationsAry = await StationModel.find();
        // console.log(stationsAry);
        resp.json({status: true, stationAry: stationsAry});
    } catch (error) {
        console.log(error);
        resp.status(500).json({status: false, msg: error})
    }
}

async function setChargePointsData(req,resp)
{
    const {ary, stationid} = req.body;
    console.log(req.body);

    try {
        const station = await StationModel.findOne({_id: stationid});
        console.log(station);
        station.chargePointsAry = ary;
        const updatedObj = await station.save();
        console.log(updatedObj);
        resp.json({status: true, obj: updatedObj});
    } catch (error) {
        console.log(error);
        resp.status(500).json({status: false, msg:error});
    }
}

async function fetchPointsData(req,resp) 
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

async function PendingBookings(req,resp) 
{
    try {
        const bookingsAry = await BookingsModel.find({$and:[
            {status: 'pending'},{station_id: req.query.stationid}
            ]});
            // console.log(bookingsAry);
            resp.json({status: true, ary: bookingsAry});

    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }
}

async function ApproveRequest(req,resp)
{
    console.log(req.body);
    try {
        const obj = await BookingsModel.findById(req.body._id);
        console.log(obj);
        obj.status = 'accepted';
        const newobj = await obj.save();
        console.log(newobj);
        
        resp.json({status: true, obj: newobj});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg:error});
    }
}

const AllPendingBookings = async (req, res) => {
    try {
        const bookings = await BookingsModel.find({status: 'pending'});
        // console.log(bookings);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

async function HomeBookings(req, resp) 
{
    try {
        const homebookings = await BookingsModel.find({status: 'bid'});
        resp.json({status: true, ary: homebookings});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }    
}

async function getStationFromCity(req, resp) 
{
    const {location} = req.query;
    console.log(location);
    try {
        const stationsary = await StationModel.find({location: location});
        console.log(stationsary);
        resp.json({status: true, ary: stationsary});
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error});
    }    
}

async function PlaceBid(req, resp) 
{
    const bid = req.body;
    console.log(bid);
    
    try {
        const lastDocument = await BidsModel.findOne().sort({ _id: -1 });
        console.log('lastbid', lastDocument);
        if(lastDocument)
        {
            if(bid.price < lastDocument.price)
            {
                const bidobj = new BidsModel(req.body);
                const obj = await bidobj.save();
                resp.json({status: true, obj: obj, task: 'better bid'});
            }
            else{
                resp.json({status: true, task: 'bid not good'});
            }
        }
        else {
            const bidobj = new BidsModel(req.body);
            const obj = await bidobj.save();
            resp.json({status: true, obj: obj, task: 'first bid'});
        }
    } catch (error) {
        console.log(error);
        resp.json({status: false, msg: error})
    }
}

module.exports = {AddStation, FetchAllStation, setChargePointsData, fetchPointsData, PendingBookings, ApproveRequest, AllPendingBookings, HomeBookings, getStationFromCity, PlaceBid};