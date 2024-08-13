import React, { useContext, useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';
import { publicAxios } from '../services/axios.config';
import { UserIDContext } from '../context/Context.jsx';
import io from 'socket.io-client';

export default function BookSlot() {
    const socket = io('http://localhost:6066');

    const location = useLocation();
    const { selectedStation: station, booking, userid } = location.state || {};
    // const { userid } = useContext(UserIDContext);
    // alert(totalUnits)
    console.log(location.state);
    // alert(JSON.stringify(location.state));
    // alert(JSON.stringify(selectedStation))
    // alert(JSON.stringify(station))

    const [charge_points, setCharge_points] = useState([]);
    const [allSlotsBooked, setAllSlotsBooked] = useState(false);

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
                    const resp = await publicAxios.get('drivers/charge-points-data?id='+station._id);
                    if(resp.data.status)
                        setCharge_points(resp.data.ary);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        initializeChargePoints();
    }, [charge_points])

    useEffect(() => {
        // Check if all slots are booked
        const allBooked = charge_points.every(point => point.status === 'booked');
        setAllSlotsBooked(allBooked);
    }, [charge_points]);

    const BookSlot = async (index) => {
        try {
            // alert(userid);
            // alert("Units= "+booking.totalUnits);
            const totalPrice = parseInt(charge_points[index].price)*booking.totalUnits;
            // alert("Price= "+totalPrice)
            const response = await publicAxios.post("/drivers/book-slot", { stationid: station._id, slotno: index, booking: {...booking, userid: userid, price: totalPrice, status: "accepted" } });
            if (response.data.status) {
                setCharge_points(response.data.ary)
                // alert(JSON.stringify(response.data.booking));
            }
            else {
                alert(response.data.msg)
            }
            
        } catch (error) {
             
            console.log(error);
        }
    }

    const generateRequest = async () => {
        try {
            // Make an API call to generate the request
            const response = await publicAxios.post("/drivers/generate-request", { stationid: station._id, booking: {...booking, userid: userid, price: 0 , status: "pending" } });
            if (response.data.status) {
                // alert(JSON.stringify(response.data.booking))
                alert("Request generated successfully. You will be notified when a slot is free.");
                // setRequestGenerated(true);
            } else {
                alert("Failed to generate request: " + response.data.msg);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while generating the request.");
        }
        socket.emit('requestUpdated');
    };

    return (
        <div className="w-screen">
            <h2 className="text-xl font-semibold mb-4 text-center">Manage Charging Points for {station.station_name}</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Status</th>
                        <th className="py-2 px-4 border-b text-center">Price (per KWhr)</th>
                        <th className="py-2 px-4 border-b text-center">Charging Speed</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {charge_points.map((point, index) => {
                        return(
                            <tr key={index}>
                            <td className="py-2 px-4 border-b text-center">
                                <input
                                    type='text'
                                    value={point.status} readOnly
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <input type='number'
                                    value={point.price}
                                    readOnly
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <select
                                    value={point.speed}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" readOnly
                                >
                                    <option value="">Select Speed</option>
                                    <option value="slow">Slow</option>
                                    <option value="fast">Fast</option>
                        z            <option value="rapid">Rapid</option>
                                    <option value="ultra-fast">Ultra-fast</option>
                                </select>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                            <button 
                                    type="button" 
                                    onClick={() => { BookSlot(index) }} 
                                    disabled={point.status === 'booked'}
                                    className={`text-white ${point.status === 'booked' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'} focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                                >
                                    {point.status === 'booked' ? 'Slot Booked' : 'Book Slot'}
                                </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            {allSlotsBooked && (
                <div className="mt-4 text-center">
                    <div className="text-red-600">
                        All slots are booked right now. You can generate a request to charge as soon as a slot is free.
                    </div>
                    <button 
                        type="button" 
                        onClick={generateRequest} 
                        className={`mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                    >
                        Generate Request
                    </button>
                </div>
            )}
        </div>
    )
}
