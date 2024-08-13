import React, { useRef, useState } from 'react'
import { publicAxios } from '../services/axios.config';

export default function Signup() {
    const [userObj, setUserObj] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        usertype: ''
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserObj({...userObj, [name]: value});
    }

    const [isDisable, setIsDisable] = useState(false);

    function confirmPassword(event)
    {
        if(event.target.value !== userObj.password)
        {
            alert("passwords do not match. Enter confirm password again");
            setIsDisable(true); 
        }
        else{
            alert("passwords match");
            setIsDisable(false);
        }
    }

    const cpassRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = publicAxios.post("/users/signin", userObj);
        alert(JSON.stringify(response));
        setUserObj({
            name: '',
            email: '',
            password: '',
            mobile: '',
            usertype: ''
        })
        cpassRef.current.value = '';
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md border-2 border-black rounded-lg bg-white shadow-md p-8">
                <h1 className="text-2xl font-bold mb-5 text-center">Sign Up</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userObj.name} onChange={handleChange}/>
                        <label htmlFor="floating_name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userObj.email} onChange={handleChange}/>
                        <label htmlFor="floating_email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userObj.password} onChange={handleChange}/>
                        <label htmlFor="floating_password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onBlur={confirmPassword} ref={cpassRef}/>
                        <label htmlFor="floating_repeat_password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="tel" name="mobile" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={userObj.mobile} onChange={handleChange}/>
                        <label htmlFor="floating_phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select name="usertype" id="floating_type" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={userObj.usertype} onChange={handleChange}>
                            <option value="" disabled selected>Select type</option>
                            <option value="station_owner">Station Owner</option>
                            <option value="vehicle_owner">Vehicle Owner</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={isDisable}>Submit</button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-3">
                    Already registered? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    )
}
