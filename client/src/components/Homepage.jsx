import React from 'react'
import Link from 'react-router-dom'
import ServicesCard from './ServicesCard';
// import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
// import { buttonVariants } from "@/components/ui/button"


function Homepage() {
  // const navigate = useNavigate();

  /*const handleClick = (event) => {
    // alert("hello")
    // alert(event.target.name);
    navigate("/"+event.target.name);
  }*/

  return (

    <div className='flex flex-col mx-[4%] gap-10'>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
            <Button asChild className='mr-2'>
              <a href="/login">Login</a>
            </Button>
            <Button asChild>
              <a href="/signup">Get Started</a>
            </Button>
            <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>
          </div>
          <div>
          </div>
        </div>
      </nav>
      <div className=' w-full mt-10'>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Environment</span> Scalable Tech.</h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Empowering your electric journey with effortless charging solutions. Connect, charge, and drive green with ease.</p>
      </div>
      <div className='mt-10'>
        <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Services</h2>
      </div>
      <div className=' gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4'>
        <div>
          <ServicesCard imgurl={"https://thumbs.dreamstime.com/b/businessman-booking-appointment-via-smartphone-app-concept-illustration-businessman-booking-appointment-via-smartphone-app-212503921.jpg"} title='Book Your Slot' path=''>
            Get your vehicle 100% charged with most efficient charging.
          </ServicesCard>
        </div>
        <div>
          <ServicesCard imgurl={"https://gigapoweruk.com/wp-content/uploads/2023/03/how-to-find-giga-power-ev-charging-stations.png"} title='Find Stations' path='/find-stations'>
            Find the best stations right in your city, next to you.
          </ServicesCard>
        </div>
        <div>
          <ServicesCard imgurl={"https://5.imimg.com/data5/SELLER/Default/2023/11/359933744/VC/TN/RX/5151621/ev-charging-station-300kw-floor-mount-500x500.jpg"} title='Register Station' path=''>
            Register with us as a partner. Offer your charging facilities.
          </ServicesCard>
        </div>
      </div>
      <AboutUs />
      <ContactUs />
    </div>
  )
}

export default Homepage;
