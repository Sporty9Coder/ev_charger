import React, { useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';
import { privateAxios } from '../services/axios.config';
import io from 'socket.io-client';

function ChargingPoints() {
    const socket = io("http://localhost:6066");
    // alert(station.charging_points);
    const location = useLocation();
    const { selectedStation: station } = location.state || {};
    console.log(location.state);
    // alert(JSON.stringify(location.state));
    // alert(JSON.stringify(selectedStation))
    // alert(JSON.stringify(station))

    const [charge_points, setCharge_points] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);

    const fetchPendingBookings = async () => {
        try {
            const response = await privateAxios.get('/stations/pending-bookings?stationid=' + station._id);
            if (response.data.status)
                setPendingBookings(response.data.ary);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingBookings();
    }, [])

    useEffect(() => {
        const initializeChargePoints = async () => {
            if (station.chargePointsAry.length === 0) {
                setCharge_points(Array.from({ length: station.charging_points }, () => ({
                    speed: '',
                    price: '',
                    status: ''
                })))
            }
            else {
                try {
                    const resp = await privateAxios.get('stations/fetch-points-data?id=' + station._id);
                    if (resp.data.status)
                        setCharge_points(resp.data.ary);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        initializeChargePoints();
    }, [station])

    const handleChange = (index, field, value) => {
        const ary = [...charge_points];
        ary[index][field] = value;
        setCharge_points(ary);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await privateAxios.post("/stations/charge-points-data", { ary: charge_points, stationid: station._id });
            if (response.data.status) {
                // alert(JSON.stringify(response.data.obj));
                setCharge_points(response.data.obj.chargePointsAry)
                station.chargePointsAry = response.data.obj.chargePointsAry;
            }
            else {
                alert(response.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function ApproveRequest(booking)
    {
        try {
            const response = privateAxios.post("/stations/approve-request", booking);
            fetchPendingBookings();
        } catch (error) {
            console.log(error);
        }
        socket.emit('requestUpdated');
    }

    return (
        <div className="w-screen mt-5">
            <h2 className="text-3xl font-semibold mb-10 text-center">Manage Charging Points for {station.station_name}</h2>

            <h3 class="text-2xl font-bold dark:text-white container mx-auto text-green-500 mb-3">Charging Points</h3>

            <table className="w-full mx-auto bg-white container">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Status</th>
                        <th className="py-2 px-4 border-b text-center">Price (per KWhr)</th>
                        <th className="py-2 px-4 border-b text-center">Charging Speed</th>
                    </tr>
                </thead>
                <tbody>
                    {charge_points.map((point, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-center">
                                <input
                                    type='text'
                                    value={point.status} onChange={(e) => { handleChange(index, 'status', e.target.value) }} placeholder='empty/booked'
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <input type='number'
                                    value={point.price}
                                    onChange={(e) => handleChange(index, 'price', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <select
                                    value={point.speed}
                                    onChange={(e) => handleChange(index, 'speed', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Speed</option>
                                    <option value="slow">Slow</option>
                                    <option value="fast">Fast</option>
                                    <option value="rapid">Rapid</option>
                                    <option value="ultra-fast">Ultra-fast</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mb-10'>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmit}
                >
                    Save Changes
                </button>
            </div>
            <h3 class="text-2xl font-bold dark:text-white container mx-auto text-green-500 mb-5">Pending Requests</h3>
            <div class="overflow-x-auto shadow-md sm:rounded-lg mt-5 container mx-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Battery Capacity (KWhr)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Units (KWhr)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingBookings.map((booking) => {
                                return (
                                    <tr>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {booking.model}
                                        </th>
                                        <td class="px-6 py-4">
                                            {booking.type}
                                        </td>
                                        <td class="px-6 py-4">
                                            {booking.battery_capacity}
                                        </td>
                                        <td class="px-6 py-4">
                                            {booking.totalUnits.toFixed(2)}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>{ApproveRequest(booking)}}>Approve</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChargingPoints
