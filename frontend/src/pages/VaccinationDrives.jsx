import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserAuthContext";
import axios from "axios";
import { message } from "antd";

const Wrapper = styled.div`
	background: ${({ theme }) => theme.background.primary};
	min-height: 100vh;
	padding: 2rem;
`;

const Title = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 1.5rem;
`;

const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const Form = styled.form`
	background: ${({ theme }) => theme.background.card};
	padding: 2rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.75rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const Label = styled.label`
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: 0.25rem;
	display: block;
`;

const Input = styled.input`
	width: 100%;
	padding: 0.75rem;
	margin-bottom: 1rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.accent};
	}
`;

const Button = styled.button`
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

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	background: ${({ theme }) => theme.background.card};
`;

const Th = styled.th`
	padding: 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.border};
	text-align: left;
	color: ${({ theme }) => theme.colors.primary};
`;

const Td = styled.td`
	padding: 0.75rem 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.border};
	color: ${({ theme }) => theme.colors.secondary};
`;

export default function Drives() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		date: "",
		doses: "",
		classes: "",
	});

	const [drives, setDrives] = useState([
		{
			id: 1,
			name: "Polio",
			date: "2025-05-20",
			doses: 200,
			classes: "5,6,7",
		},
		{
			id: 2,
			name: "Hepatitis B",
			date: "2025-06-02",
			doses: 150,
			classes: "6,7",
		},
	]);

	const [editDrive, setEditDrive] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (editDrive) {
			// update drive
		} else {
			// create drive

			const today = dayjs();
			const scheduledDate = dayjs(form.date);
			const diffDays = scheduledDate.diff(today, "day");

			if (diffDays < 15) {
				message.error("Drive must be scheduled at least 15 days in advance.");
				return;
			}

			try {
				const response = await axios.post(
					`${import.meta.env.VITE_APP_API_URL}/drives/create`,
					form
				);
				if (response.data.status) {
					message.success("Drive created successfully.");
					getVaccinationDrives();
					setForm({ name: "", date: "", doses: "", classes: "" });
				}
			} catch (error) {
				console.log(error);
				message.error(error.response.data.message || "Something went wrong");
			}
		}
	};

	const handleEdit = (drive) => () => {
		const driveDate = dayjs(drive.date, "DD-MM-YYYY");
		const isPast = driveDate.isBefore(dayjs(), "day");

		if (isPast) {
			message.error("Drive date is in the past.");
			return;
		}

		setForm(drive);
		setEditDrive(true);
	};

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
		getVaccinationDrives();
	}, [user]);

	return (
		<Wrapper>
			<Title>Vaccination Drive Management</Title>
			<FlexBox>
				{/* Form to Create Drive */}
				<Form onSubmit={handleSubmit}>
					<Label>Vaccine Name</Label>
					<Input name='name' placeholder='e.g., Polio' value={form.name} onChange={handleChange} />

					<Label>Date of Drive</Label>
					<Input type='date' name='date' value={form.date} onChange={handleChange} />

					<Label>Number of Doses</Label>
					<Input name='doses' type='number' value={form.doses} onChange={handleChange} />

					<Label>Applicable Classes (comma separated)</Label>
					<Input
						name='classes'
						placeholder='e.g., 5,6,7'
						value={form.classes}
						onChange={handleChange}
					/>

					<Button type='submit'>{editDrive ? "Update Drive" : "Create Drive"}</Button>
				</Form>

				{/* Upcoming Drives Table */}
				<Table>
					<thead>
						<tr>
							<Th>Vaccine</Th>
							<Th>Date</Th>
							<Th>Doses</Th>
							<Th>Classes</Th>
							<Th>Edit</Th>
						</tr>
					</thead>
					<tbody>
						{drives.map((d) => (
							<tr key={d.id}>
								<Td>{d.name}</Td>
								<Td>{d.date}</Td>
								<Td>{d.doses}</Td>
								<Td>{d.classes}</Td>
								<Td>
									<Button onClick={handleEdit(d)}>Edit</Button>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</FlexBox>
		</Wrapper>
	);
}
