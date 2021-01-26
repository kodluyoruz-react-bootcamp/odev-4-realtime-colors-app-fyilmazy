import { useEffect, useContext } from "react";
import ColorContext from "./context/ColorContext";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ColorChanger from "./components/ColorChanger";
import "./App.css";
import {
	disconnectSocket,
	initialData,
	initSocket,
	receiveChanges,
} from "./SocketClient";

function App() {
	const { setSocketColor, setSocketName } = useContext(ColorContext);

	useEffect(() => {
		initSocket();

		initialData((data) => {
			setSocketColor(data[0]);
			setSocketName(data[1]);
		}, []);

		receiveChanges((changes) => {
			setSocketColor(changes[0]);
			setSocketName(changes[1]);
		});
		return () => disconnectSocket();
	}, []);

	return (
		<div className="App">
			<Container>
				<Header />
				<ColorChanger />
				<Footer />
			</Container>
		</div>
	);
}

export default App;
