import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
	// socket = io("http://localhost:3000", {       // for local setup
	socket = io("https://realtime-color-backend.herokuapp.com/", {
		transports: ["websocket"],
	});

	console.log("connecting...");

	socket.on("connect", () => console.log("connected"));
};

export const disconnectSocket = () => {
	console.log("disconnected");
	if (socket) socket.disconnect();
};

export const sendColor = (color, name) => {
	if (socket) socket.emit("new-color", [color, name]);
};

export const receiveChanges = (cb) => {
	if (!socket) return true;
	socket.on("changes", (changed) => {
		cb(changed);
	});
};

export const initialData = (cb) => {
	socket.on("new-data", (data) => {
		cb(data);
	});
};
