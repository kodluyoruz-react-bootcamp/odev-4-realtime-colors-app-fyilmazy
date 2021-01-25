const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Changes = require("./lib/Changes");

app.get("/", (req, res) => {
	res.send("This is the backend server!");
});

io.on("connection", (socket) => {
	console.log("a user connected");

	//client emit
	Changes.colorAndName((data) => {
		if (data) {
			console.log("backend data: ", data);
			io.emit("new-data", data);
		}
	});

	socket.on("new-color", (response) => {
		console.log("I got color as :", response[0], " and name as: ", response[1]);

		// redis upsert
		const upserted = { color: response[0], name: response[1] };
		Changes.upsert(upserted);

		socket.broadcast.emit("changes", [response[0], response[1]]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
