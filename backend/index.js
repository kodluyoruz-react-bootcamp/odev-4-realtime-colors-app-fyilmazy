const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
let port = process.env.PORT || 3000;

const Changes = require("./lib/Changes");

app.get("/", (req, res) => {
	res.send("This is the backend server!");
});

io.on("connection", (socket) => {
	console.log("\x1b[36m%s\x1b[0m", "a user connected");

	//client color emit
	Changes.getChanges((data) => {
		const results = JSON.parse(data);
		console.log("Parsed JSON data coming from db:", data);
		if (data !== null && data !== undefined) {
			console.log("Color change broadcasted.");
			console.log("Changed by", results[1], "and new color hex is", results[0]);

			io.emit("new-data", results);
		}
	});

	socket.on("new-color", (response) => {
		console.log(
			"Backend got color as :",
			response[0],
			" and name as: ",
			response[1]
		);

		// redis upsert
		const upserted = { color: response[0], name: response[1] };
		Changes.upsert(upserted);

		socket.broadcast.emit("changes", response);
	});

	socket.on("disconnect", () => {
		console.log("\x1b[31m%s\x1b[0m", "user disconnected");
	});
});

http.listen(port, () => {
	/* 3000  <=>  port for Heroku deployment */
	console.log("listening on *:3000");
});
