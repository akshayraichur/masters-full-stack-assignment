import { Theme } from "./theme/ThemeProvider";
import RoutePaths from "./routes";
import Navbar from "./components/Navbar";
import UserAuthContext from "./store/UserAuthContext";

function App() {
	return (
		<UserAuthContext>
			<Theme>
				<Navbar />
				<RoutePaths />
			</Theme>
		</UserAuthContext>
	);
}

export default App;
