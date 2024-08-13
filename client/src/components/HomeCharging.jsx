import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { publicAxios } from '@/services/axios.config';

export default function HomeCharging() {
    const location = useLocation();
    const { servicetype: station_type, booking, userid } = location.state || {};

    const [vehicleDetails, setVehicleDetails] = useState(booking || {
        model: '',
        type: '',
        company: '',
        battery_capacity: 0,
        totalUnits: 0
    });

    const [notify, setNotify] = useState(false);
    const [showBidButton, setShowBidButton] = useState(false);

    useEffect(() => {
        if (booking) {
            setVehicleDetails(booking);
        }
    }, [booking]);

    function handleChange(event) {
        const { name, value } = event.target;
        setVehicleDetails({ ...vehicleDetails, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const efficiency = 0.90;
        const Units = vehicleDetails.battery_capacity / efficiency;
        setVehicleDetails({ ...vehicleDetails, totalUnits: Units });
        setNotify(true);
        setShowBidButton(true);
    }

    async function placeBid() {
        alert("start")
        // Implement your bid placement logic here
        try {
            alert('in try block')
            const response = await publicAxios.post("/drivers/home-charging", { homebooking: {...vehicleDetails, userid: userid, status: "bid" } });
            if (response.data.status) {
                alert(JSON.stringify(response.data.booking));
            }
            else {
                alert(response.data.msg)
            }
            
        } catch (error) {
             
            console.log(error);
        }

        // Simulate successful bid placement
            alert('Bid placed successfully!');
            // Reset the form for a new bid
            setVehicleDetails({
                model: '',
                type: '',
                company: '',
                battery_capacity: 0,
                totalUnits: 0
            });
            setNotify(false);
            setShowBidButton(false);
    }

    return (
        <div className='flex flex-col'>
            <div className="mx-auto mt-5 border-2 bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold mb-4">Enter Vehicle Details</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="vehicle-model" className="block text-gray-700 text-sm font-bold mb-2">Vehicle Model</label>
                        <input 
                            type="text" 
                            id="vehicle-model" 
                            name="model" 
                            placeholder="e.g., Tesla Model 3" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={vehicleDetails.model}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vehicle-type" className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
                        <select 
                            id="vehicle-type" 
                            name="type" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={vehicleDetails.type}
                            onChange={handleChange}
                        >
                            <option value="">Choose Vehicle</option>
                            <option value="car">Car</option>
                            <option value="scooty">Scooty</option>
                            <option value="e-rickshaw">E-Rickshaw</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vehicle-company" className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                        <select 
                            id="vehicle-company" 
                            name="company" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={vehicleDetails.company}
                            onChange={handleChange}
                        >
                            <option value="">Choose Company</option>
                            <option value="ola">Ola</option>
                            <option value="tata">Tata</option>
                            <option value="bajaj">Bajaj</option>
                            <option value="tesla">Tesla</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="battery-capacity" className="block text-gray-700 text-sm font-bold mb-2">Battery Capacity</label>
                        <input 
                            type="number" 
                            id="battery-capacity" 
                            name="battery_capacity" 
                            placeholder="in kWh" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                            value={vehicleDetails.battery_capacity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        {notify && (
                            <div className="p-4 text-green-700 font-medium">
                                Total Units: {vehicleDetails.totalUnits.toFixed(2)} kWh
                            </div>
                        )}
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {showBidButton && (
                    <div className="mt-4 mx-auto">
                        <Button onClick={placeBid}>Place Bid</Button>
                    </div>
                )}
        </div>
    );
}
