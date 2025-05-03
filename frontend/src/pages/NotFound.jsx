import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	height: 100vh;
	background-color: ${({ theme }) => theme.background.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 6rem;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.accent};
	margin: 0;
`;

const Subtitle = styled.p`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-top: 1rem;
	margin-bottom: 2rem;
`;

const Button = styled.button`
	padding: 0.75rem 1.5rem;
	background-color: ${({ theme }) => theme.colors.accent};
	color: white;
	border: none;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.accentHover};
	}
`;

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Wrapper>
			<Title>404</Title>
			<Subtitle>Oops! Page not found</Subtitle>
			<Button onClick={() => navigate("/")}>Go to Dashboard</Button>
		</Wrapper>
	);
}
