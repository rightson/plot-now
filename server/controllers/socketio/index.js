export default {
    handler
}

async function handler(socket) {
    console.log(`socket.id = ${socket.id}`)
    socket.on('packet', function(packet) {
        console.log(`packet is ${JSON.stringify(packet)}`);
    })
}
