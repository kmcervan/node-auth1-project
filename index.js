require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 4120;
server.listen(port, ()=>console.log(`\n** Running on port ${port} **\n`));