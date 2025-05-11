import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../store/UserAuthContext";
import axios from "axios";
import dayjs from "dayjs";
import { Select } from "antd";
import { VaccinationReportTable } from "../components/VaccinationReportTable";

const Wrapper = styled.div`
	background: ${({ theme }) => theme.background.primary};
	min-height: 100vh;
	padding: 2rem;
`;

const Title = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 1.5rem;
`;

const FilterSection = styled.div`
	background: ${({ theme }) => theme.background.card};
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.75rem;
	padding: 1.5rem;
	margin-bottom: 2rem;
`;

const Label = styled.label`
	display: block;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: 0.25rem;
`;

const Button = styled.button`
	margin-top: 1rem;
	background-color: ${({ theme }) => theme.colors.accent};
	color: white;
	padding: 0.75rem 1.25rem;
	border: none;
	border-radius: 0.5rem;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.accentHover};
	}
`;

const Pagination = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`;

export default function Reports() {
	const [vaccineFilter, setVaccineFilter] = useState("");
	const [drives, setDrives] = useState([]);
	const [reportData, setReportData] = useState([]);

	const handleDownload = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_API_URL}/drives/report/?vaccineName=${vaccineFilter}`
			);
			const responseData = response.data.data;
			setReportData(responseData);
		} catch (error) {
			console.log(error);
		}
	};

	const { user } = React.useContext(UserContext);
	const navigate = useNavigate();

	const getVaccinationDrives = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/drives/upcoming`);
			const responseData = response.data.data;
			setDrives(
				responseData.map((drive) => ({
					id: drive.id,
					name: drive.name,
					date: dayjs(drive.date).format("DD-MM-YYYY"),
					doses: drive.dosesCount,
					classes: drive.applicableClasses.join(", ") || "All",
				}))
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
	}, [user]);

	useEffect(() => {
		getVaccinationDrives();
	}, []);

	return (
		<Wrapper>
			<Title>Vaccination Reports</Title>

			<FilterSection>
				<Label htmlFor='vaccine'>Filter by Vaccine</Label>
				<Select
					id='vaccine'
					style={{ width: "100%" }}
					value={vaccineFilter}
					onChange={(e) => {
						setVaccineFilter(e);
						console.log(e);
					}}>
					{drives.map((drive) => (
						<option value={drive.name} key={drive.name}>
							{drive.name}
						</option>
					))}
				</Select>

				<Button onClick={handleDownload}>Download Report</Button>
			</FilterSection>

			<VaccinationReportTable reportData={reportData} />
		</Wrapper>
	);
}
