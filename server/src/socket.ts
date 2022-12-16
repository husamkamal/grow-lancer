/* eslint-disable max-len */
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import passport from 'passport';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app';
import { SocketProps } from './interfaces';
import { passportAuth } from './middlewares/auth';

dotenv.config();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_LINK,
    credentials: true,

  },
  cookie: true,
});

passportAuth(passport);

const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next);

const users: any = {

};
io.use(wrap(cookieParser()));
io.use(wrap(passport.authenticate('jwt', { session: false })));

io.on('connection', (socket: any) => {
  const user = socket.request?.user;
  users[`${user.role}${user.userID}`] = socket.id;

  socket.on('acceptProposal', async ({
    clientName, receiverId, jobTitle, jobId,
  } : SocketProps) => {
    io.to(users[`freelancer${receiverId}`]).emit('sendNotification', {
      clientName,
      jobTitle,
      jobId,
    });
  });
  socket.on('disconnect', () => {
    delete users[`${user.role}${user.userID}`];
  });
});

export default httpServer;
