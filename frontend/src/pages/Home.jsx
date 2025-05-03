import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	min-height: 100vh;
	background-color: ${({ theme }) => theme.background.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3rem;
	max-width: 1000px;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const Image = styled.img`
	width: 100%;
	max-width: 400px;
	border-radius: 1rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
	max-width: 500px;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 1rem;
`;

const Text = styled.p`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: 2rem;
	line-height: 1.6;
`;

const Button = styled.button`
	background-color: ${({ theme }) => theme.colors.accent};
	color: white;
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 0.5rem;
	font-weight: 600;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background-color: ${({ theme }) => theme.colors.accentHover};
	}
`;

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<Wrapper>
			<Container>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/3784/3784184.png'
					alt='Vaccination Illustration'
				/>
				<Content>
					<Title>Welcome to the School Vaccination Portal</Title>
					<Text>
						A secure and intuitive system to manage and track student vaccination drives across your
						school. From scheduling to reporting – everything in one place.
					</Text>
					<Button onClick={() => navigate("/login")}>Get Started</Button>
				</Content>
			</Container>
		</Wrapper>
	);
}
