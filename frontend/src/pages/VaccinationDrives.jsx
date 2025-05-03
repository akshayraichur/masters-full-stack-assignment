import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

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

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const today = dayjs();
		const scheduledDate = dayjs(form.date);
		const diffDays = scheduledDate.diff(today, "day");

		if (diffDays < 15) {
			alert("Drive must be scheduled at least 15 days in advance.");
			return;
		}

		const newDrive = {
			...form,
			id: Date.now(),
		};
		setDrives([...drives, newDrive]);
		alert("Drive created (simulated).");
		setForm({ name: "", date: "", doses: "", classes: "" });
	};

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

					<Button type='submit'>Create Drive</Button>
				</Form>

				{/* Upcoming Drives Table */}
				<Table>
					<thead>
						<tr>
							<Th>Vaccine</Th>
							<Th>Date</Th>
							<Th>Doses</Th>
							<Th>Classes</Th>
							<Th>Editable?</Th>
						</tr>
					</thead>
					<tbody>
						{drives.map((d) => (
							<tr key={d.id}>
								<Td>{d.name}</Td>
								<Td>{d.date}</Td>
								<Td>{d.doses}</Td>
								<Td>{d.classes}</Td>
								<Td>{dayjs(d.date).isAfter(dayjs()) ? "✅" : "❌"}</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</FlexBox>
		</Wrapper>
	);
}
