import axios from 'axios';

const baseURL = "http://localhost:6066";

const publicAxios = axios.create({baseURL});

const privateAxios = axios.create({baseURL});

privateAxios.interceptors.request.use((config)=>{

    let token = localStorage.getItem("access_token");
    console.log("token from localStorage"+" "+token);

    if(token) {
        config.headers.Authorization=`Bearer ${token}`;
    }
    else {
        console.log("token not received");
        return;
    }

    return config;
})

export {publicAxios, privateAxios};