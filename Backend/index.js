const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv').config();
const socketSetup = require('./socket');

const systemRoutes = require('./routes/systemRoutes');
const dummyRoutes = require('./routes/dummyRoutes');
const metricsRoutes = require('./routes/metricsRoutes');

const app = express();
const server = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN ,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
socketSetup(io);

app.use(cors({
  origin: process.env.CORS_ORIGIN ,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());




app.use('/api/system', systemRoutes);
app.use('/api/dummy', dummyRoutes);
app.use('/api/metrics', metricsRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
