import { ThemeProvider } from "styled-components";

const theme = {
	background: {
		primary: "#f9fafb",
		card: "#ffffff",
	},
	colors: {
		primary: "#111827",
		secondary: "#6b7280",
		accent: "#3b82f6",
		accentHover: "#2563eb",
		danger: "#ef4444",
		dangerHover: "#dc2626",
		success: "#16a34a",
		successHover: "#15803d",
	},
	border: "#e5e7eb",
};

export const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
