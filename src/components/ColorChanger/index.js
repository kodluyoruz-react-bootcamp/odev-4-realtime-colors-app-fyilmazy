import styles from "./ColorChanger.module.css";
import { useContext } from "react";
import ColorContext from "../../context/ColorContext";

function ColorChanger() {
	const {
		colorChangeHandler,
		submitChangesHandler,
		selectedColor,
		name,
	} = useContext(ColorContext);
	return (
		<div>
			<form>
				<label htmlFor="colorInput">
					<input
						name="colorInput"
						type="color"
						onChange={colorChangeHandler}
					></input>
				</label>
			</form>
			<button className={styles.button} onClick={submitChangesHandler}>
				Send Changes
			</button>
			<h3>
				{selectedColor === null
					? ""
					: `${name} changed color to ${selectedColor}`}
			</h3>
		</div>
	);
}

export default ColorChanger;
