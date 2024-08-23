import React, { useContext, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { BidsContext } from '@/context/Context';
import { privateAxios } from '@/services/axios.config';
import { useNavigate } from 'react-router-dom';

export default function Biddings() {
    const [homeBookings, setHomeBookings] = useState([]);
    const [homeStations, setHomeStations] = useState([]);
    const [isBiddingOpen, setIsBiddingOpen] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const [timerId, setTimerId] = useState(null);

    const { dispatch, bids } = useContext(BidsContext);

    useEffect(() => {
        const HomeBookings = async () => {
            try {
                const response = await privateAxios.get('stations/home-bookings');
                if (response.data.status) setHomeBookings(response.data.ary);
                else alert(response.data.msg);
            } catch (error) {
                console.log(error);
            }
        };

        const HomeStations = async () => {
            try {
                const response = await privateAxios.get('/drivers/public-stations?station_type=private home charging');
                if (response.data.status) setHomeStations(response.data.resary);
                else alert(response.data.msg);
            } catch (error) {
                console.log(error);
            }
        };

        HomeBookings();
        HomeStations();
    }, []);

    const startTimer = () => {
        setIsBiddingOpen(true);
        setCountdown(30);

        if (timerId) {
            clearInterval(timerId);
        }

        const newTimerId = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(newTimerId);
                    setIsBiddingOpen(false);
                    alert('Bidding is complete.');
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        setTimerId(newTimerId);
    };

    const placeBid = async (bid) => {
        try {
            const response = await privateAxios.post('/stations/place-bid', bid);
            if (response.data.status) {
                console.log(response.data.task);
                if (response.data.task !== 'bid not good') {
                    console.log(response.data.obj);
                    alert('Bid placed');
                    startTimer(); // Restart the timer on successful bid
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();

    return (
        <div className='container'>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="user photo" />
                        </button>
                        {/* Dropdown menu  */}
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div class="px-4 py-3">
                                <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul class="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={()=>{
                                        localStorage.removeItem('access_token')
                                        navigate("/")
                                    }}>Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/manage-station" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Manage Stations</a>
                            </li>
                            <li>
                                <a href="/biddings" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Bookings</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Earnings</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Timer display */}
            <div className='text-center text-2xl mx-auto mt-5'>
                {countdown !== null ? (
                    <h2 className='text-xl'>
                        Time remaining: {countdown} seconds
                    </h2>
                ) : (
                    <h2 className='text-xl'>Bidding is complete.</h2>
                )}
            </div>

            <h1 className="text-4xl font-bold dark:text-white text-green-600 font-serif my-6 text-center">Home Bookings</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-serif table-auto">
                        <tr>
                            <th scope="col" className="px-6 py-3">Model</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Company</th>
                            <th scope="col" className="px-6 py-3">Battery Capacity</th>
                            <th scope="col" className="px-6 py-3">Total Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homeBookings.map((booking) => (
                            <tr key={booking.model} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {booking.model}
                                </th>
                                <td className="px-6 py-4">{booking.type}</td>
                                <td className="px-6 py-4">{booking.company}</td>
                                <td className="px-6 py-4">{booking.battery_capacity}</td>
                                <td className="px-6 py-4">{booking.totalUnits.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {homeStations.map((station) => (
                    <Card
                        key={station.id}
                        station={station}
                        placeBid={placeBid}
                        isBiddingOpen={isBiddingOpen}
                    />
                ))}
            </div>
        </div>
    );
}

function Card({ station, placeBid, isBiddingOpen }) {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 grid-flow-row">
            <div className="flex items-center gap-5 mb-4 mx-auto max-w-sm">
                <h5 className="text-2xl font-bold leading-none text-purple-600 dark:text-white">{station.station_name}</h5>
                <h5 className="text-2xl font-bold leading-none text-purple-600 dark:text-white">{station.location}</h5>
            </div>
            <div className="mt-5">
                <div className=''>
                    <div className='text-center grid grid-flow-row'>
                        <div className='grid grid-flow-col'>
                            <div className='font-medium text-yellow-500 text-center'>Speed</div>
                            <div className='font-medium text-yellow-500 text-center'>Price</div>
                            <div className='font-medium text-yellow-500 text-center'>Action</div>
                        </div>
                        <ul role="list" className="text-center">
                            {station.chargePointsAry.map((slot, index) => (
                                (index < 2 || showAll) && (
                                    <li key={index} className="py-2 sm:py-4 grid grid-flow-col text-center">
                                        <div>{slot.speed}</div>
                                        <div className="items-center text-base font-semibold text-gray-900 dark:text-white ">
                                            {slot.price}
                                        </div>
                                        <div>
                                            <Button
                                                variant='outline'
                                                className='h-7'
                                                onClick={() => placeBid({ ...slot, station_id: station._id, station_name: station.station_name, location: station.location })}
                                                disabled={!isBiddingOpen} // Disable the button when bidding is closed
                                            >
                                                Bid
                                            </Button>
                                        </div>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                    <Button onClick={() => setShowAll(!showAll)} className='float-right text-red-500 mt-3' variant='link'>
                        {showAll ? 'Show Less' : 'Show More'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
