const dotenv = require('dotenv');
const io = require('socket.io')(8900, {cors: process.env.CLIENT_URL});

let users = [];

io.on('connection', (socket)=> {

    socket.on('addUser', (userId)=> {
        !users.some(user => user.userId === userId) &&
        users.push({userId, socketId:socket.id})

        io.emit('getUsers', users);
    })

    socket.on('sendMessage', ({reciverId, payload})=> {
        const user = users.find(user => user.userId === reciverId);
        console.log('')
        io.to(user.socketId).emit('getMessage', payload);
    })

    socket.on('disconnect', ()=> {
        console.log('someone disconnected!')
        users = users.filter(user => user.socketId !== socket.id);

        io.emit('getUsers', users)
    })
})