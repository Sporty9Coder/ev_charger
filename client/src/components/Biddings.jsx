import { privateAxios } from '@/services/axios.config';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

export default function Biddings() {
    useEffect(() => {
        const HomeBookings = async () => {
            try {
                const response = await privateAxios.get('stations/home-bookings');
                // alert(JSON.stringify(response.data.ary));
                if (response.data.status)
                    setHomeBookings(response.data.ary);
                else alert(response.data.msg);
            } catch (error) {
                console.log(error);
            }
        }

        const HomeStations = async () => {
            try {
                const response = await privateAxios.get('/drivers/public-stations?station_type=private home charging');
                // alert(JSON.stringify(response.data.resary));
                if (response.data.status)
                    setHomeStations(response.data.resary);
                else alert(response.data.msg);
            } catch (error) {
                console.log(error);
            }
        }

        HomeBookings();
        HomeStations();
    }, [])

    const [homeBookings, setHomeBookings] = useState([]);
    const [homeStations, setHomeStations] = useState([]);

    return (
        <div className='container'>

            <h1 class="text-4xl font-bold dark:text-white text-green-600 font-serif my-6 text-center">Home Bookings</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-serif table-auto">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Battery_capacity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total_Units
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            homeBookings.map((booking) => {
                                return (
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {booking.model}
                                        </th>
                                        <td class="px-6 py-4">
                                            {booking.type}
                                        </td>
                                        <td class="px-6 py-4">
                                            {booking.company}
                                        </td>
                                        <td class="px-6 py-4">
                                            {booking.battery_capacity}
                                        </td>
                                        <td class="px-6 py-4">
                                            {booking.totalUnits.toFixed(2)}
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
