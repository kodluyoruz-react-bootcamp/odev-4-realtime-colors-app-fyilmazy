const redisClient = require("../clients/redis");

function Changes() {
	this.client = redisClient.getClient();
}

module.exports = new Changes();

Changes.prototype.upsert = function (changes) {
	this.client.hset(
		"changes",
		"static",
		JSON.stringify({
			changes,
		}),
		(err) => {
			if (err) {
				console.log(err);
			}
		}
	);
};

Changes.prototype.colorAndName = function (callback) {
	let userData = [];

	this.client.hgetall("changes", function (err, colorName) {
		if (err) {
			console.error(err);
			return callback([]);
		}

		for (let values in colorName) {
			userData.push(JSON.parse(colorName[values]));
		}
		console.log("userdata", userData[0].changes);
		return callback(userData[0].changes);
	});
};
