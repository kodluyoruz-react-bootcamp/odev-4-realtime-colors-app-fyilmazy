const redis = require("redis");

// local setup //
// return redis.createClient({
//	host: "localhost",
//	port: "6379",

const getClient = () => {
	return redis.createClient(process.env.REDIS_URL);
};

module.exports.getClient = getClient;
