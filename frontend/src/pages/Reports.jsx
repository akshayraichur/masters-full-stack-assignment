import React, { useState } from "react";
import styled from "styled-components";

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

const Select = styled.select`
	padding: 0.75rem;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;
	font-size: 1rem;

	&:focus {
		border-color: ${({ theme }) => theme.colors.accent};
		outline: none;
	}
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

const Pagination = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`;

export default function Reports() {
	const [vaccineFilter, setVaccineFilter] = useState("");

	const handleDownload = () => {
		alert("Simulate: Export to CSV or PDF");
	};

	const reportData = [
		{
			id: "S001",
			name: "Ananya",
			vaccine: "Hepatitis B",
			date: "2025-03-10",
			status: "Vaccinated",
		},
		{ id: "S002", name: "Rohit", vaccine: "Polio", date: "2025-03-15", status: "Vaccinated" },
	];

	return (
		<Wrapper>
			<Title>Vaccination Reports</Title>

			<FilterSection>
				<Label htmlFor='vaccine'>Filter by Vaccine</Label>
				<Select
					id='vaccine'
					value={vaccineFilter}
					onChange={(e) => setVaccineFilter(e.target.value)}>
					<option value=''>All Vaccines</option>
					<option value='Hepatitis B'>Hepatitis B</option>
					<option value='Polio'>Polio</option>
					<option value='Tetanus'>Tetanus</option>
				</Select>

				<Button onClick={handleDownload}>Download Report</Button>
			</FilterSection>

			<Table>
				<thead>
					<tr>
						<Th>Student ID</Th>
						<Th>Name</Th>
						<Th>Vaccine</Th>
						<Th>Date</Th>
						<Th>Status</Th>
					</tr>
				</thead>
				<tbody>
					{reportData.map((s) => (
						<tr key={s.id}>
							<Td>{s.id}</Td>
							<Td>{s.name}</Td>
							<Td>{s.vaccine}</Td>
							<Td>{s.date}</Td>
							<Td>{s.status}</Td>
						</tr>
					))}
				</tbody>
			</Table>

			<Pagination>
				<Button>Prev</Button>
				<Button>Next</Button>
			</Pagination>
		</Wrapper>
	);
}
