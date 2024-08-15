import React, { useEffect, useState } from 'react'
import AddStationModal from './AddStationModal';
import { func } from 'prop-types';
import ChargingPoints from './ChargingPoints';
import { privateAxios } from '../services/axios.config';
import { useNavigate } from 'react-router-dom';

function ManageStation() {
    const [stationsAry, setStationsAry] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();

    function handleClick(selectedStation)
    {
        navigate("/charge_point_data", { state : {selectedStation} });
    }

    useEffect(() => {
        const fetchStations = async () => {
            try {
                console.log("Fetching stations...");
                const response = await privateAxios.get("/stations/fetch-stations");
                console.log(response.data.stationAry);
                if (response.data.status === true) {
                    console.log("Stations fetched successfully");
                    setStationsAry(response.data.stationAry);
                } else {
                    console.log(response.data.msg);
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchStations();
    }, [])

    const openModel = () => { setIsModalOpen(true) };
    const closeModel = () => { setIsModalOpen(false) };

    const addStation = (newStation) => {
        setStationsAry([...stationsAry, newStation]);
        // alert(JSON.stringify(stationsAry));
    }

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div>
                <button type="button" class="text-white fixed mt-3 top-0 right-0 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-30 h-10" onClick={openModel}>Add Station</button>
            </div>
            <AddStationModal onClose={closeModel} isOpen={isModalOpen} addStation={addStation} />
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

export default ManageStation

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
                    View Details
                </a>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Delete Station 
                </a>
            </div>
        </div>
    )
}