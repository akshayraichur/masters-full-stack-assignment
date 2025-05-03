import React from "react";
import { Route, Routes } from "react-router-dom";

const RoutePaths = () => {
	return (
		<Routes>
			<Route path='/' element={<h1>hi </h1>} />
		</Routes>
	);
};

export default RoutePaths;
