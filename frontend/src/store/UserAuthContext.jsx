import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserAuthContext = ({ children }) => {
	const [user, setUser] = useState(null);

	const loginHandler = (userData) => {
		setUser(userData);
	};

	const navigate = useNavigate();

	const logoutHandler = () => {
		setUser(null);
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser, loginHandler, logoutHandler }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserAuthContext;
