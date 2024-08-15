import React, { useContext, useRef } from 'react'
import { publicAxios } from '../services/axios.config';
import { useNavigate } from 'react-router-dom';

function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const obj = {
            email: emailRef.current.value,
            password: passRef.current.value
        }

        const response = await publicAxios.post('/users/login', obj);
        // alert(JSON.stringify(response));     
        // alert(response.data.user.usertype);
        localStorage.setItem("access_token", response.data.token);
        if(response.data.user.usertype === 'station_owner')
        {
            navigate('/station-dash')
        }
        else if(response.data.user.usertype === 'vehicle_owner')
        {
            const userid = response.data.user._id;
            navigate('/user-dash', {state: { userid }});
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-sm rounded shadow-sm-light border-2 border-black p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ref={emailRef}/>
                <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ref={passRef}/>
                <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
            </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-5">
            New user? <a href="/signup" className="text-blue-500 hover:underline">Register here</a>
        </p>
    </div>
</div>
  )
}

export default Login
