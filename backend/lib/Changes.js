const redisClient = require("../clients/redis");

function Changes() {
	this.client = redisClient.getClient();
}

module.exports = new Changes();

Changes.prototype.upsert = function (changes) {
	console.log("Changes passed to db:", changes);
	const sendChanges = [changes.color, changes.name];
	this.client.set("changes", JSON.stringify(sendChanges));
};

Changes.prototype.getChanges = function (callback) {
	this.client.get("changes", function (err, dbData) {
		if (err) {
			console.log(err);
		}
		console.log("Sent initial data from db: ", dbData);
		return callback(dbData);
	});
};
