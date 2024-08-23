import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { privateAxios } from '@/services/axios.config';
import { useSelector } from 'react-redux'
import { BidsContext } from '@/context/Context';

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
    // const bidsList = useSelector((state) => {
    //     try {
    //         console.log(state);
    //         return state.bidList.bids; 
    //     } catch (error) {
    //         console.log(error);
    //     }});

    // const { bids } = useContext(BidsContext);
    // const bidsList = bids;
        // useEffect(()=>{
        //     console.log(bidsList);
        // },[bidsList])

    useEffect(() => {
        if (booking) {
            setVehicleDetails(booking);
        }
        console.log('HomeCharging component rendered');
        console.log(bids);
        // console.log(bidsList);
        // alert(JSON.stringify(bidsList))
    }, [booking]);

    // useEffect(()=>{
    //     const { bids } = useContext(BidsContext);
    //     bidsList = bids;
    // },[bidsList])

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

    async function BookingRequest() {

        // alert("start")
        // Implement your bid placement logic here
        try {
            // alert('in try block')
            const response = await privateAxios.post("/drivers/home-charging", { homebooking: {...vehicleDetails, userid: userid, status: "bid" } });
            if (response.data.status) {
                // alert(JSON.stringify(response.data.booking));
                alert('Bid placed successfully!');
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
            else {
                alert(response.data.msg)
            }
            
        } catch (error) {
             
            console.log(error);
        }      
    }

    const [bids, setBids] = useState([]) 

    async function getBids() {
        try {
            const response = await privateAxios.get('/drivers/get-bids');
            if (response.data.status) {
                setBids(response.data.bids);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch bids initially and then every 30 seconds
    useEffect(() => {
        getBids(); // Initial call

        const intervalId = setInterval(getBids, 30000); // Fetch bids every 30 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return (
        <>
        
        {/* <div className='text-center mx-auto mt-4 text-2xl'>{bids.length}</div> */}
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
                        <Button onClick={BookingRequest}>Request Booking</Button>
                    </div>
                )}
                

<div class="relative overflow-x-auto shadow-md sm:rounded-lg container">
    <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Station name
                </th>
                <th scope="col" class="px-6 py-3">
                    Location
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Speed
                </th>
            </tr>
        </thead>
        <tbody>
            {
                bids.map((bid)=>{
                    return (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {bid.station_name}
                </th>
                <td class="px-6 py-4">
                    {bid.location}
                </td>
                <td class="px-6 py-4">
                    {bid.price}
                </td>
                <td class="px-6 py-4">
                    {bid.speed}
                </td>
            </tr>
                    )
                })
            }
            
        </tbody>
    </table>
    </div>
</div>
        </>
    );
}
