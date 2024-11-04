// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/pricing', require('./routes/pricingRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/file', require('./routes/fileRoutes'));

// Real-time updates with Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
