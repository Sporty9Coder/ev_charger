import axios from 'axios';

const baseURL = "http://localhost:6066";

const publicAxios = axios.create({baseURL});

export {publicAxios};