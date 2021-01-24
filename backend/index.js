const httpServer = require("http").createServer((req, res) => {
	res.end("This is the backend server!");
});

httpServer.listen(3000, () => {
	console.log("connected!");
});
