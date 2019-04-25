require('dotenv').config();
const redis = require('redis');

// create and connect redis client to local instance.
var redisClient = redis.createClient;
// var redisConnect = redisClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
var redisConnect = redis.createClient({
    port : process.env.REDIS_PORT,
    host : process.env.REDIS_HOST, 
    password : process.env.REDIS_PASS,
    no_ready_check: true,
});
redisConnect.on('connect', function() {
   console.log('Redis client connected');

});
// Print redis errors to the console
redisConnect.on('error', (err) => {
   console.log("Error " + err);
});

module.exports = redisConnect;


