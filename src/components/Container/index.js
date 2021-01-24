import styles from "./Container.module.css";
import { useContext, useEffect } from "react";
import ColorContext from "../../context/ColorContext";

function Container(props) {
	const { selectedColor, setName } = useContext(ColorContext);

	useEffect(() => {
		setName(prompt("Enter your name please"));
	}, []);
	return (
		<div
			className={styles.container}
			style={{ backgroundColor: selectedColor }}
		>
			{props.children}
		</div>
	);
}

export default Container;
