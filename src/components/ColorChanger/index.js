import styles from "./ColorChanger.module.css";
import { useContext } from "react";
import ColorContext from "../../context/ColorContext";
import ColorInformation from "../ColorInformation";

function ColorChanger() {
	const {
		colorChangeHandler,
		submitChangesHandler,
		color,
		socketName,
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
				Apply Changes
			</button>
			<div>{socketName === "" ? "" : <ColorInformation />}</div>
			<div>
				<h3>
					{socketName !== "" || color === ""
						? ""
						: `You changed color to ${color}`}
				</h3>
			</div>
		</div>
	);
}

export default ColorChanger;
