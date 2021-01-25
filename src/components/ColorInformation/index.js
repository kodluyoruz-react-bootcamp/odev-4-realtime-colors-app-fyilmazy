import React from "react";
import { useContext } from "react";
import ColorContext from "../../context/ColorContext";

function ColorInformation() {
	const { socketColor, socketName, yourTurn } = useContext(ColorContext);

	return (
		<div>
			<h3>
				{socketName} changed color to: {socketColor}
			</h3>
		</div>
	);
}

export default ColorInformation;
