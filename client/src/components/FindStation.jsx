import { privateAxios } from '@/services/axios.config';
import React, { useEffect, useState } from 'react'

export default function FindStation() {
    useEffect(()=>{
        const locations = async () => {
            try {
                const response = await privateAxios.get('/drivers/locations');
                if(response.data.status)
                    setLocations(response.data.ary);
                else 
                    alert(response.data.msg);
            } catch (error) {
                console.log(error);
            }    
        }

        locations();
    },[])

    const [locations, setLocations] = useState([]);
    const [stations, setStations] = useState([]);

    const handleClick = async (location) => {
        try {
            const response = await privateAxios.get('/stations/station-in-onecity?location='+location);
            if(response.data.status)
                setStations(response.data.ary);
            else 
            {console.log(response.data.msg);
                alert(JSON.stringify(response.data.msg));}
        } catch (error) {
            console.log(error);
        }  
    }

    return (
        <div className='container'>
            <div className='my-5'>

                <h1 className="text-5xl font-extrabold dark:text-white">Find Station<small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">Locate nearby station</small></h1>

            </div>
            <form >
                <div className="flex mt-5">
                    <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">All Locations<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg></button>
                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            {
                                locations.map((location)=>(<li>
                                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>handleClick(location)}>{location}</a>
                                </li>))
                            }
                        </ul>
                    </div>
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg></button>
                    </div>
                </div>
            </form>
            <div className='mt-5 flex '>
            {
                    stations.map((station, index) => {
                        return (
                            <StationCard station={station} />
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
                <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Book Slot
                </a>
            </div>
        </div>
    )
}
