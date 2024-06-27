const app = require('./app');
const http = require('http');

const dotenv=require("dotenv");
dotenv.config({path:"./Config/config.env"}); 
const port = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
