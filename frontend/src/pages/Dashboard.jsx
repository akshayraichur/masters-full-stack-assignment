import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
	const [drivesInfo, setDrivesInfo] = useState({
		totalStudents: 0,
		vaccinatedStudents: 0,
		upcomingDrives: 0,
		vaccinationPercentage: 0,
	});

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
	}, [user]);

	const fetchUpcomingDrives = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/drives/upcoming`);

			if (response.data.status) {
				setDrivesInfo((prevState) => ({ ...prevState, upcomingDrives: response.data.data.length }));
			}
		} catch (error) {
			console.log(error);
			setDrivesInfo((prevState) => ({ ...prevState, upcomingDrives: 0 }));
		}
	};

	const fetchTotalStudents = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/students/total`);
			if (response.data.status) {
				setDrivesInfo((prevState) => ({
					...prevState,
					totalStudents: response.data.totalStudentsCount,
				}));
			}
		} catch (error) {
			console.log(error);
			setDrivesInfo((prevState) => ({ ...prevState, totalStudents: 0 }));
		}
	};

	const fetchVaccinatedStudents = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_API_URL}/students/total-vaccinated`
			);
			if (response.data.status) {
				setDrivesInfo((prevState) => ({
					...prevState,
					vaccinatedStudents: response.data.totalDosesGiven,
					vaccinationPercentage: response.data.vaccinationPercentage,
				}));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUpcomingDrives();
		fetchTotalStudents();
		fetchVaccinatedStudents();
	}, []);

	return (
		<Wrapper>
			<Title>Welcome, {user?.name}!</Title>
			<MetricsGrid>
				<MetricCard>
					<h3>Total Students</h3>
					<p>{drivesInfo.totalStudents || 0}</p>
				</MetricCard>
				<MetricCard>
					<h3>Total Vaccination</h3>
					<p>
						{drivesInfo.vaccinatedStudents || 0} ({drivesInfo.vaccinationPercentage || 0})
					</p>
				</MetricCard>
				<MetricCard>
					<h3>Upcoming Drives</h3>
					<p>{drivesInfo.upcomingDrives || 0} drives in next 30 days</p>
				</MetricCard>
			</MetricsGrid>
		</Wrapper>
	);
}
