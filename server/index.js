const app = require('express')
const server = require("http").createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

const PORT = 3001

io.on('connection', socket => {
    console.log("Usuário Conectado", socket.id) //esse id é um id gerado para cada conexão
    
    socket.on('disconnect', reason => {
        console.log("Usuário desconectado", socket.id)
    } )

    //essa função faz com que o sokket escute esse evento
    socket.on('set_username', username => {
        socket.data.username = username
        //console.log(socket.data.username)
    })

    //o servidor tá recebendo a sms e essa sms será enviada para o nosso front-end
    socket.on('message', text => {
        // io significa que é o servidor que ta emitindo a sms
        io.emit('recive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
} )

server.listen(PORT, () => {
    console.log("Server Running ...")
})
