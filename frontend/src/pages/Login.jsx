import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginWrapper = styled.div`
	min-height: 100vh;
	background-color: ${({ theme }) => theme.background.primary};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginCard = styled.div`
	background-color: ${({ theme }) => theme.background.card};
	padding: 3rem;
	border-radius: 1rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	width: 360px;
	border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h2`
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.colors.primary};
	text-align: center;
`;

const Input = styled.input`
	width: 100%;
	padding: 0.8rem;
	margin-bottom: 1.5rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.background.card};

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.accent};
	}
`;

const Button = styled.button`
	width: 100%;
	padding: 0.9rem;
	background: ${({ theme }) => theme.colors.accent};
	color: white;
	font-weight: 600;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: background 0.3s;

	&:hover {
		background: ${({ theme }) => theme.colors.accentHover};
	}
`;

const Error = styled.p`
	color: ${({ theme }) => theme.colors.danger};
	margin-top: -1rem;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	text-align: left;
`;

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = () => {
		if (username.trim() === "") {
			setError("Please enter your name to continue");
			return;
		}

		localStorage.setItem("school_admin", username);
		navigate("/dashboard");
	};

	return (
		<LoginWrapper>
			<LoginCard>
				<Title>School Vaccination Portal</Title>
				<Input
					placeholder='Enter your name'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{error && <Error>{error}</Error>}
				<Button onClick={handleLogin}>Login</Button>
			</LoginCard>
		</LoginWrapper>
	);
}
