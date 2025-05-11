import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../store/UserAuthContext";
import axios from "axios";
import { message, Table } from "antd";
import StudentTable from "../components/StudentTable";
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

const UploadSection = styled.form`
	margin-top: 1rem;
	background: ${({ theme }) => theme.background.card};
	padding: 2rem;
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.75rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

export default function Students() {
	const { user } = React.useContext(UserContext);
	const navigate = useNavigate();

	const [students, setStudents] = useState([]);
	const [form, setForm] = useState({
		name: "",
		id: "",
		class: "",
	});
	const [editStudent, setEditStudent] = useState(false);
	const [columns, setColumns] = useState([
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Class",
			dataIndex: "class",
			key: "class",
		},
		{
			title: "Vaccinated",
			dataIndex: "vaccinated",
			key: "vaccinated",
			render: (vaccinated) => (vaccinated ? "✅" : "❌"),
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (_, record) => <Button onClick={() => handleEdit(record)}>Edit</Button>,
		},
	]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleEditStudent = async (e) => {
		e.preventDefault();

		if (
			e.target.name.value.trim() === "" ||
			e.target.id.value.trim() === "" ||
			e.target.class.value.trim() === ""
		) {
			message.error("Please fill all the fields");
			return;
		}

		try {
			const response = await axios.put(
				`${import.meta.env.VITE_APP_API_URL}/students/edit/${e.target.id.value.trim()}`,
				{
					name: e.target.name.value,
					class: e.target.class.value,
					id: e.target.id.value.trim(),
				}
			);

			if (response.data.status) {
				fetchStudents();
				message.success("Student updated successfully");
				setEditStudent(false);
				setForm({ name: "", id: "", class: "" });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddStudent = async (e) => {
		e.preventDefault();

		if (editStudent) {
			handleEditStudent(e);
		} else {
			if (
				e.target.name.value.trim() === "" ||
				e.target.id.value.trim() === "" ||
				e.target.class.value.trim() === ""
			) {
				message.error("Please fill all the fields");
				return;
			}

			try {
				const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/students/add`, {
					name: e.target.name.value,
					id: e.target.id.value,
					class: e.target.class.value,
				});

				if (response.data.status) {
					fetchStudents();
					message.success("Student added successfully");
					e.target.reset();
				} else {
					message.error(response.data.message);
				}
			} catch (error) {
				message.error(error.response.data.message);
			}
		}
	};

	const handleBulkUpload = async (e) => {
		e.preventDefault();

		const file = e.target.csvUpload.files[0];

		if (!file) {
			message.error("Please select a file");
			return;
		}

		if (file.type !== "text/csv") {
			message.error("Please select a valid CSV file");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_APP_API_URL}/students/bulk-upload`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.data.status) {
				fetchStudents();
				message.success("Students uploaded successfully");
			}
		} catch (error) {
			message.error(error?.response?.data?.message || "Upload failed");
		}
	};

	const fetchStudents = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/students/`);

			if (response.data.status) {
				setStudents(response.data.students);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async (student) => {
		setEditStudent(true);
		setForm({ ...student });
	};

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
				<Form onSubmit={handleAddStudent}>
					<Label htmlFor='name'>Student Name</Label>
					<Input
						id='name'
						name='name'
						placeholder='e.g., Aarya Sharma'
						value={form.name}
						onChange={handleChange}
					/>

					<Label htmlFor='id'>Student ID</Label>
					<Input
						id='id'
						name='id'
						placeholder='e.g., S123'
						value={form.id}
						onChange={handleChange}
						disabled={editStudent}
					/>

					<Label htmlFor='class'>Class</Label>
					<Input
						id='class'
						name='class'
						placeholder='e.g., 6A'
						value={form.class}
						onChange={handleChange}
					/>

					<Button type='submit'>{editStudent ? "Update Student" : "Add Student"}</Button>
				</Form>

				<UploadSection onSubmit={handleBulkUpload}>
					<Label htmlFor='csvUpload'>Bulk Upload (CSV)</Label>
					<Input id='csvUpload' name='csvUpload' type='file' accept='.csv' />

					<Button type='submit'>Upload</Button>
				</UploadSection>

				{/* Students Table */}
				{/* <Table columns={columns} dataSource={students} rowKey={(record) => record.id} /> */}
				<StudentTable />
			</FlexBox>
		</Wrapper>
	);
}
