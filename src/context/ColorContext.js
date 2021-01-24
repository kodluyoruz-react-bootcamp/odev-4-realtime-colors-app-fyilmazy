import { createContext, useEffect, useState } from "react";

import React from "react";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
	const [selectedColor, setSelectedColor] = useState(null);
	const [bgColor, setBgColor] = useState();
	const [name, setName] = useState();

	const colorChangeHandler = (e) => {
		setBgColor(e.target.value);
		console.log("bgColor :", bgColor);
	};

	const submitChangesHandler = (selectedColor) => {
		setSelectedColor(bgColor);
		console.log("selectedColor :", selectedColor);
	};

	useEffect(() => {
		setBgColor(selectedColor === null ? "#ffffff" : selectedColor);
	}, [selectedColor]);

	const values = {
		selectedColor,
		setSelectedColor,
		bgColor,
		colorChangeHandler,
		submitChangesHandler,
		name,
		setName,
	};

	return (
		<ColorContext.Provider value={values}>{children}</ColorContext.Provider>
	);
};

export default ColorContext;
