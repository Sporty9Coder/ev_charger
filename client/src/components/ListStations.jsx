import React, { useEffect, useState } from 'react'
import AddStationModal from './AddStationModal';
import { func } from 'prop-types';
import ChargingPoints from './ChargingPoints';
import { privateAxios } from '../services/axios.config';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ListStations() {
    const [stationsAry, setStationsAry] = useState([]);

    const location = useLocation();
    const {servicetype : station_type, booking, userid} = location.state || {};
    
    const navigate = useNavigate();

    function handleClick(selectedStation)
    {
        // alert("Units = "+booking.totalUnits);
        navigate("/book-slot", { state : { selectedStation, booking, userid } });
    }

    useEffect(() => {
        const fetchStations = async () => {
            try {
                console.log("Fetching stations...");
                const response = await privateAxios.get("/drivers/public-stations?station_type="+station_type);
                console.log(response.data.stationAry);
                if (response.data.status === true) {
                    console.log(station_type+" Stations fetched successfully");
                    setStationsAry(response.data.resary);
                } else {
                    console.log(response.data.msg);
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchStations();
    }, [])

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 ml-16'>
                {
                    stationsAry.map((station, index) => {
                        return (
                            <StationCard station={station} clickEvent={handleClick}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


function StationCard(props)
{
    return (
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.station.station_name+" ("+props.station.station_type+")"}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.station.location}</p>
            <div className='flex gap-3'>
                <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{
                    props.clickEvent(props.station)
                }}>
                    Book Slot
                </a>
            </div>
        </div>
    )
}