import { Theme } from "./theme/ThemeProvider";
import RoutePaths from "./routes";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Theme>
			<Navbar />
			<RoutePaths />
		</Theme>
	);
}

export default App;
