const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const adsRoutes = require('./routes/ads.routes')
// const usersRoutes = require('./routes/users.routes');
// const authRoutes = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 8000;

// Configure cors
app.use(cors());

// Configure body parser middleware
app.use(express.json());

// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/BulletinBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.error(err);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
// app.use('/api/users', usersRoutes);
app.use('/api/ads', adsRoutes);
// app.use('/auth', authRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
