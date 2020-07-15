const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;
const server = http.createServer(app);
console.log(`Starting server on localhost:${port}...`);

server.listen(port);
console.log('Server is running!');