import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingContext, UserIDContext } from '../context/Context.jsx';

export default function UserBookings() {
    const location = useLocation();
    const { userid } = location.state || {};

    const [vehicleDetails, setVehicleDetails] = useState({
        model: "",
        type: "",
        company: "",
        battery_capacity: 0, 
        totalUnits: 0
    })

    const [notify, setNotify] = useState(false);

    function handleChange(event)
    {
        const {name, value} = event.target;
        // alert(name)
        // alert(value)
        setVehicleDetails({...vehicleDetails, [name]: value})
        // alert(JSON.stringify(vehicleDetails));
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        const efficiency = 0.90;
        console.log(vehicleDetails.battery_capacity);
        // alert(vehicleDetails.battery_capacity);
        const Units = vehicleDetails.battery_capacity/efficiency;
        setVehicleDetails({...vehicleDetails, totalUnits: Units})
        setNotify(true);
    }

    return (
        <>
            <div class="mx-auto mt-5 border-2 bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 class="text-2xl font-semibold mb-4">Enter Vehicle Details</h2>
                <form>
                    <div class="mb-4">
                        <label for="vehicle-model" class="block text-gray-700 text-sm font-bold mb-2">Vehicle Model</label>
                        <input type="text" id="vehicle-model" name="model" placeholder="e.g., Tesla Model 3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}/>
                    </div>
                    <div class="mb-4">
                        <label for="vehicle-type" class="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
                        <select id="vehicle-type" name="type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}>
                            <option value="">Choose Vehicle</option>
                            <option value="car">Car</option>
                            <option value="scooty">Scooty</option>
                            <option value="e-rickshaw">E-Rickshaw</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="vehicle-company" class="block text-gray-700 text-sm font-bold mb-2">Company</label>
                        <select id="vehicle-company" name="company" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}>
                            <option value="">Choose Company</option>
                            <option value="ola">Ola</option>
                            <option value="tata">Tata</option>
                            <option value="bajaj">Bajaj</option>
                            <option value="tesla">Tesla</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="battery-capacity" class="block text-gray-700 text-sm font-bold mb-2">Battery Capacity</label>
                        <input type="number" id="battery-capacity" name="battery_capacity" placeholder="in kWh" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  onChange={handleChange}/>
                    </div>
                    <div className="flex justify-between items-center">
                            {notify && (
                                <div className="p-4 text-green-700 font-medium">
                                    Total Units : {vehicleDetails.totalUnits.toFixed(2)} kWh
                                </div>
                            )}
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
                        </div>
                </form>
            </div>
            <div className='container flex gap-5 justify-center text-center mx-auto mt-20 mb-5'>
            {/* /chargenearby */}
            <UserIDContext.Provider value={userid}>
            <BookingContext.Provider value={vehicleDetails}>
                <BookingServices title="Book on Nearby Stations" body="Stop by and get your vehicle fully recharged. Charging will take time. You need to park your vehicle. We provide you with the latest charging technologies catered to your vehicle's needs." path="/list-stations" type='public'/>
                <BookingServices title="Instant Battery replacement" body="In a HURRY! Fear not. We have got you covered with our instant battery replacement facility that would help you reach your destination without worrying about the battery." path="/drivers/instantreplmnt" type='instant charge'/>
                {/* /overnightcharge */}
                <BookingServices title="Overnight Charging" body="Charge your vehicle at lower rates at private home stations of our trusted partners. Sleep without worrying. Wake up in the morning with your ride fully recovered." path="/home-charging" type='private home charging'/>
            </BookingContext.Provider>
            </UserIDContext.Provider>
            </div>
        </>
    )
}

function BookingServices({ title, body, path, type }) {
    const navigate = useNavigate();
    const booking = useContext(BookingContext);
    const userid = useContext(UserIDContext);

    function handleClick()
    {
        const servicetype = type
        navigate(path, {state: { servicetype, booking, userid }});
    }

    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
                <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>
                    Charge Your Vehicle
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    )
}
