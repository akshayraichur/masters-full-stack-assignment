import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarWrapper = styled.nav`
	background-color: ${({ theme }) => theme.background.card};
	padding: 1rem 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.border};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Brand = styled.h1`
	color: ${({ theme }) => theme.colors.accent};
	font-size: 1.5rem;
	font-weight: bold;
	margin: 0;
`;

const NavItems = styled.div`
	display: flex;
	gap: 1.5rem;

	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.secondary};
		font-weight: 500;

		&.active {
			color: ${({ theme }) => theme.colors.accent};
		}

		&:hover {
			color: ${({ theme }) => theme.colors.accentHover};
		}
	}
`;

const LogoutButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.danger};
	font-weight: 600;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.dangerHover};
	}
`;

export default function Navbar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<NavbarWrapper>
			<Brand>School Vaccination Portal</Brand>
			<NavItems>
				<NavLink to='/dashboard'>Dashboard</NavLink>
				<NavLink to='/students'>Students</NavLink>
				<NavLink to='/drives'>Drives</NavLink>
				<NavLink to='/reports'>Reports</NavLink>
				<LogoutButton onClick={handleLogout}>Logout</LogoutButton>
			</NavItems>
		</NavbarWrapper>
	);
}
