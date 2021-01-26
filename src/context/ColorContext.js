import { createContext, useEffect, useState } from "react";
import { sendColor } from "../SocketClient";
import React from "react";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
	const [color, setColor] = useState("");
	const [bgColor, setBgColor] = useState();
	const [name, setName] = useState();
	const [socketColor, setSocketColor] = useState("");
	const [socketName, setSocketName] = useState("");

	const colorChangeHandler = (e) => {
		setBgColor(e.target.value);
	};

	useEffect(() => {
		if (socketName !== "" && socketColor !== "") {
			setBgColor(color === "" ? "#ffffff" : color);
		}
	}, []);

	const submitChangesHandler = () => {
		setSocketName("");
		setColor(bgColor);
		sendColor(bgColor, name);
	};

	useEffect(() => {
		setBgColor(socketColor);
	}, [socketColor]);

	const values = {
		color,
		setColor,
		bgColor,
		colorChangeHandler,
		submitChangesHandler,
		name,
		setName,
		socketColor,
		setSocketColor,
		socketName,
		setSocketName,
	};

	return (
		<ColorContext.Provider value={values}>{children}</ColorContext.Provider>
	);
};

export default ColorContext;
