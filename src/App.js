import { ColorProvider } from "./context/ColorContext";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ColorChanger from "./components/ColorChanger";

import "./App.css";

function App() {
	return (
		<div className="App">
			<ColorProvider>
				<Container>
					<Header />
					<ColorChanger />
					<Footer />
				</Container>
			</ColorProvider>
		</div>
	);
}

export default App;
