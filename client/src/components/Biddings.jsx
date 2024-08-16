import { privateAxios } from '@/services/axios.config';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { addBid, deleteBid, clearAllBids } from '@/Slice/BidsSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function Biddings() {
    useEffect(() => {
        const HomeBookings = async () => {
            try {
                const response = await privateAxios.get('stations/home-bookings');
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

    const bidsList = useSelector((state) => {
        console.log(state);
        return state.bidList.bids});
    const dispatch = useDispatch();

    function placeBid(bid)
    {
        alert(JSON.stringify(bid));
        dispatch(addBid(bid));
        console.log(bidsList);
        // alert(JSON.stringify(bidsList));
    }

    return (
        <div className='container'>
            <h1 className="text-4xl font-bold dark:text-white text-green-600 font-serif my-6 text-center">Home Bookings</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-serif table-auto">
                        <tr>
                            <th scope="col" className="px-6 py-3">Model</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Company</th>
                            <th scope="col" className="px-6 py-3">Battery_capacity</th>
                            <th scope="col" className="px-6 py-3">Total_Units</th>
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
                {homeStations.map((station)=>(
                    <Card station={station} placeBid={placeBid}/>
                ))}
            </div>
        </div>
    );
}

function Card({station, placeBid})
{
    const [showAll, setShowAll] = useState(false); // Added state for showing all items

    return (
            <div key={station.id} className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 grid-flow-row">
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
                                        <div className="">
                                            {slot.speed}
                                        </div>
                                        <div className="items-center text-base font-semibold text-gray-900 dark:text-white ">
                                            {slot.price}
                                        </div>
                                        <div className=''>
                                            <Button variant='outline' className='h-7' onClick={() => {placeBid({...slot, station_id: station._id, station_name: station.station_name, location: station.location})}}>Bid</Button>
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
    )
}
