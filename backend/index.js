const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
	res.send("This is the backend server!");
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("new-color", (response) => {
		console.log("I got color as :", response[0], " and name as: ", response[1]);

		socket.broadcast.emit("changes", [response[0], response[1]]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
