
module.exports = function (req, res) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    let io = req.IO
    req.IO.on('connection', function (socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('user_send', function (data) {
           console.log(data)
        });
    });
}