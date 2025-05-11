import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../store/UserAuthContext";

const Wrapper = styled.div`
	background: ${({ theme }) => theme.background.primary};
	min-height: 100vh;
	padding: 2rem;
`;

const Title = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 1rem;
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

const Input = styled.input`
	padding: 0.75rem;
	margin-bottom: 1rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;
	width: 100%;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.accent};
	}
`;

const Label = styled.label`
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: 0.25rem;
	display: block;
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
	margin-top: 2rem;
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

const UploadSection = styled.div`
	margin-top: 1rem;
`;

export default function Students() {
	const [students, setStudents] = useState([
		{ id: "S001", name: "Ananya", class: "5A", vaccinated: true },
		{ id: "S002", name: "Rohit", class: "6B", vaccinated: false },
	]);

	const handleAddStudent = (e) => {
		e.preventDefault();
		// simulate adding student
		alert("Student added (simulate logic)");
	};

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
			<Title>Student Management</Title>
			<FlexBox>
				{/* Add Student Form */}
				<Form onSubmit={handleAddStudent}>
					<Label htmlFor='name'>Student Name</Label>
					<Input id='name' name='name' placeholder='e.g., Aarya Sharma' />

					<Label htmlFor='id'>Student ID</Label>
					<Input id='id' name='id' placeholder='e.g., S123' />

					<Label htmlFor='class'>Class</Label>
					<Input id='class' name='class' placeholder='e.g., 6A' />

					<Button type='submit'>Add Student</Button>

					<UploadSection>
						<Label htmlFor='csv-upload'>Bulk Upload (CSV)</Label>
						<Input id='csv-upload' type='file' accept='.csv' />
					</UploadSection>
				</Form>

				{/* Students Table */}
				<Table>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th>Class</Th>
							<Th>Vaccinated</Th>
						</tr>
					</thead>
					<tbody>
						{students.map((s) => (
							<tr key={s.id}>
								<Td>{s.id}</Td>
								<Td>{s.name}</Td>
								<Td>{s.class}</Td>
								<Td>{s.vaccinated ? "✅" : "❌"}</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</FlexBox>
		</Wrapper>
	);
}
