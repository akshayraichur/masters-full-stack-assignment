import { ThemeProvider } from "styled-components";

const theme = {
	background: {
		primary: "#f1f5f9", // soft blue-gray
		card: "#ffffff", // clean white
	},
	colors: {
		primary: "#1e293b", // slate (text)
		secondary: "#64748b", // muted blue-gray
		accent: "#38bdf8", // soft blue (buttons/links)
		accentHover: "#0ea5e9", // hover state for accent
		danger: "#f87171", // soft red
		dangerHover: "#ef4444", // stronger red on hover
		success: "#22c55e", // nice green
		successHover: "#16a34a", // deep green
	},
	border: "#e2e8f0",
};


export const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
