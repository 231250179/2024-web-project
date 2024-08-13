//创建服务器
const http = require('http');


const serverHander = require('../app.js');

var PORT = 3080;

const server = http.createServer(serverHander);

server.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
})




