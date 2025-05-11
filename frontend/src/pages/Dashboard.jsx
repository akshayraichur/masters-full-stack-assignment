import React from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	background: ${({ theme }) => theme.background.primary};
	min-height: 100vh;
	padding: 2rem;
`;

const Title = styled.h1`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 2rem;
	margin-bottom: 1.5rem;
`;

const MetricsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1.5rem;
`;

const MetricCard = styled.div`
	background: ${({ theme }) => theme.background.card};
	padding: 1.5rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.75rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default function Dashboard() {
	const { user } = React.useContext(UserContext);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
	}, [user]);

	return (
		<Wrapper>
			<Title>Welcome, {user?.name}!</Title>
			<MetricsGrid>
				<MetricCard>
					<h3>Total Students</h3>
					<p>1200</p>
				</MetricCard>
				<MetricCard>
					<h3>Vaccinated Students</h3>
					<p>1043 (86.9%)</p>
				</MetricCard>
				<MetricCard>
					<h3>Upcoming Drives</h3>
					<p>2 drives in next 30 days</p>
				</MetricCard>
			</MetricsGrid>
		</Wrapper>
	);
}
