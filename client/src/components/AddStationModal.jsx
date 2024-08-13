import { func } from 'prop-types';
import React, { useState } from 'react'
import { publicAxios } from '../services/axios.config';


function AddStationModal({ onClose, isOpen, addStation }) {
    const [stationObj, setStationObj] = useState({
        station_name: '',
        station_type: '',
        location: '',
        charging_points: 1,
        chargePointsAry: [],
        operating_hours: ''
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setStationObj({...stationObj, [name]: value});
    }

    async function handleSubmit(event)
    {
        event.preventDefault();
        // alert(JSON.stringify(stationObj));
        const response = await publicAxios.post("/stations/add-station", stationObj);
        if(response.data.status === true)
        {
            // alert("hello")
            addStation(response.data.station);
            // alert(JSON.stringify(response.data.station))
            alert("station added successfully")
        }
        setStationObj({
            station_name: '',
            station_type: '',
            charging_points: 1,
            location: '',
            operating_hours: ''
        })
    }

    if (!isOpen)
        return null;

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000] ${isOpen ? 'backdrop-blur-sm' : ''}`} onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white p-5 rounded-lg relative w-full max-w-xl h-auto" onClick={(e) => e.stopPropagation()}>
                <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 class="text-2xl font-semibold mb-6">Add New Charging Station</h1>
                    <form action="/submit-station" method="POST" onSubmit={handleSubmit}>

                        {/* Station Name  */}
                        <div class="mb-4">
                            <label for="station-name" class="block text-sm font-medium text-gray-700">Station Name</label>
                            <input type="text" value={stationObj.station_name} id="station-name" name="station_name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter station name" onChange={handleChange}/>
                        </div>

                        {/* Station Type  */}
                        <div class="mb-4">
                            <label for="station-type" class="block text-sm font-medium text-gray-700">Station Type</label>
                            <select id="station-type" value={stationObj.station_type} name="station_type" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange}>
                                <option value="">Select station type</option>
                                <option value="public">Public</option>
                                <option value="private home charging">Private Home Charging</option>
                            </select>
                        </div>

                        {/* Location  */}
                        <div class="mb-4">
                            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" value={stationObj.location} id="location" name="location" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter station location" onChange={handleChange}/>
                        </div>

                        {/* Number of Charging Points  */}
                        <div class="mb-4">
                            <label for="charging-points" class="block text-sm font-medium text-gray-700">Number of Charging Points</label>
                            <input type="number" value={stationObj.charging_points} id="charging-points" name="charging_points" required min="1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter number of charging points" onChange={handleChange}/>
                        </div>

                        {/* Operating Hours  */}
                        <div class="mb-4">
                            <label for="operating-hours" class="block text-sm font-medium text-gray-700">Operating Hours</label>
                            <input type="text" value={stationObj.operating_hours} id="operating-hours" name="operating_hours" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter operating hours (e.g., 9 AM - 5 PM)" onChange={handleChange}/>
                        </div>

                        {/* Submit Button  */}
                        <div class="mb-4 flex flex-row gap-2">
                            <button type="submit" class="w-1/2 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Station</button>
                            <button type="button" class="w-1/2 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onClose}>Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddStationModal