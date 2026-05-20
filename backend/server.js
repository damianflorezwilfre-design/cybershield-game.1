const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Conexión a MongoDB (Usando MongoDB Memory Server para modo standalone/fácil ejecución)
const { MongoMemoryServer } = require('mongodb-memory-server');

async function startDatabase() {
  try {
    // Si hay una URI en el .env que NO es localhost, usarla (ej. Atlas)
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost')) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Conectado a MongoDB (Externa)');
    } else {
      // Iniciar MongoDB en memoria
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('✅ Conectado a MongoDB (Servidor en Memoria Local Activo)');
    }
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err);
  }
}

startDatabase();

// Rutas
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
