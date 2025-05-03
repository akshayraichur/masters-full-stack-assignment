import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import VaccinationDrives from "./pages/VaccinationDrives";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/Home";

const RoutePaths = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/students' element={<Students />} />
			<Route path='/reports' element={<Reports />} />
			<Route path='/drives' element={<VaccinationDrives />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default RoutePaths;
