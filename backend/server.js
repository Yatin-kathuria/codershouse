require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const DBConnect = require('./database');
const cookieParser = require('cookie-parser');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cookieParser());
const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
// routes
const routes = require('./routes');
const ACTIONS = require('./actions');

const PORT = process.env.PORT || 5500;
DBConnect();

app.use(express.json({ limit: '8mb' }));
app.use(routes);

const socketUserMapping = {};

// socket logic
io.on('connection', (socket) => {
  console.log('new Connection', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    console.log({ roomId, user });
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });
    socket.emit(ACTIONS.ADD_PEER, {});

    socket.join(roomId);
    console.log(clients);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
