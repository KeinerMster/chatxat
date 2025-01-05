const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para servir archivos estáticos (en caso de necesitarlo)
app.use(express.static('public'));

// Cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escucha el mensaje del cliente y lo emite a todos los usuarios conectados
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Cuando el usuario se desconecta
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Establecer el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
