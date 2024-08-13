import React, { useEffect, useState } from 'react'
import { publicAxios } from '../services/axios.config';
import { useLocation } from 'react-router-dom';
import { PieCharts } from './PieCharts';
import io from 'socket.io-client';

export default function StationDash() {
    const socket = io('http://localhost:6066');

    const [stations, setStations] = useState([]);
    const [bookings, setBookings] = useState([]);

    const fetchStationsAndBookings = async () => {
        try {
            // Fetch all stations
            const stationsRes = await publicAxios.get('/stations/fetch-stations'); // Adjust API endpoint as needed
            const bookingsRes = await publicAxios.get('/stations/all-bookings'); // Adjust API endpoint as needed

            const allStations = stationsRes.data.stationAry;
            const pendingBookings = bookingsRes.data.filter(booking => booking.status === 'pending');

            setStations(allStations);
            setBookings(pendingBookings);
        } catch (error) {
            console.error("Error fetching stations or bookings", error);
        }
    };

    useEffect(() => {
        // Initial Fetch
        fetchStationsAndBookings();

        socket.on('updateStationDash', () => {
            fetchStationsAndBookings();
        });

        // Clean up the event listener on component unmount
        return () => {
            socket.off('updateStationDash');
        };
    }, []);

    const getStationNameAndLocation = (stationId) => {
        const station = stations.find(station => station._id === stationId);
        return station ? `${station.station_name} - ${station.location}` : 'Station not found';
    };
    
    return (
        <div>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
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
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
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
                                <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Bookings</a>
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
            <PieCharts className='container border-none rounded-none shadow-none'></PieCharts>
            <div className='container'>
            {stations.map((station) => {
                const stationBookings = bookings.filter(booking => booking.station_id === station._id);

                return (
                    <div key={station._id} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{getStationNameAndLocation(station._id)}</h2>
                        {stationBookings.length > 0 ? (
                          <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                              <tr className="bg-gray-100">
                                  <th className="py-2 px-4 border-b  text-center">Model</th>
                                  <th className="py-2 px-4 border-b  text-center">Type</th>
                                  <th className="py-2 px-4 border-b  text-center">Company</th>
                                  <th className="py-2 px-4 border-b  text-center">Battery Capacity</th>
                                  <th className="py-2 px-4 border-b text-center">Total Units</th>
                              </tr>
                          </thead>
                          <tbody>
                              {stationBookings.map((booking, index) => (
                                  <tr
                                      key={booking._id}
                                      className={`${
                                          index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'
                                      } hover:bg-gray-300`}
                                  >
                                      <td className="py-2 px-4 border-b  text-center">{booking.model}</td>
                                      <td className="py-2 px-4 border-b  text-center">{booking.type}</td>
                                      <td className="py-2 px-4 border-b  text-center">{booking.company}</td>
                                      <td className="py-2 px-4 border-b  text-center">
                                          {booking.battery_capacity}
                                      </td>
                                      <td className="py-2 px-4 border-b text-center">{booking.totalUnits}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  ) : (
                      <p className="text-gray-600">No pending bookings for this station.</p>
                  )}
                    </div>
                );
            })}
            </div>
        </div>
    )
}
