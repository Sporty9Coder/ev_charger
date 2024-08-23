import { io } from 'socket.io-client'

const url = 'http://localhost:6066';

export const socket = io(url);