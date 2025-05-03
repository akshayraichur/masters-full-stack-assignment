import { Theme } from "./theme/ThemeProvider";
import RoutePaths from "./routes";

function App() {
	return (
		<Theme>
			<RoutePaths />
		</Theme>
	);
}

export default App;
