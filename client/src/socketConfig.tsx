import { io } from 'socket.io-client';

const link = process.env.REACT_APP_SERVER_LINK;
const socket = io(link || 'http://localhost:3500', {
  withCredentials: true,
});

export default socket;
