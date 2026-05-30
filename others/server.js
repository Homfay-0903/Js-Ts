const http = require('http')

//http.createServer(function(request, response) {
//    response.writeHead(200, {'Content-Type': 'text/plain'})
//
//    response.end('hello word')
//}).listen(8888)
//
//console.log('Server running at http://127.0.0.1:8888/')

const Server = http.createServer()

Server.on('request', function(request, response) {
    console.log('someone view here')
    response.end('success')
})

Server.listen(8888, function() {
    console.log('Server running at http://127.0.0.1:8888/')
})