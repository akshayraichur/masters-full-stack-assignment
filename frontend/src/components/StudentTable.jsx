import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const StudentTable = ({ handleEdit, updateStudents }) => {
	const [columns, setColumns] = useState([]);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetchColumnsAndStudents();
	}, [updateStudents]);

	const fetchColumnsAndStudents = async () => {
		try {
			const [drivesRes, studentsRes] = await Promise.all([
				axios.get(`${import.meta.env.VITE_APP_API_URL}/drives/upcoming`),
				axios.get(`${import.meta.env.VITE_APP_API_URL}/students/`),
			]);

			const drives = drivesRes?.data?.data?.map((drive) => drive.name);
			const studentData = studentsRes.data.students;

			// Base columns
			const baseColumns = [
				{ title: "ID", dataIndex: "id", key: "id" },
				{ title: "Name", dataIndex: "name", key: "name" },
				{ title: "Class", dataIndex: "class", key: "class" },
			];

			const driveColumns = drives?.map((drive) => ({
				title: `${drive}`,
				dataIndex: ["vaccinatedDrives", drive],
				key: drive,
				width: 100,
				render: (val, record) => (
					<input
						type='checkbox'
						checked={record.vaccination_drives.includes(drive)}
						onChange={() => handleToggleVaccination(record.id, drive, !val)}
					/>
				),
			}));

			const actionColumn = {
				title: "Actions",
				dataIndex: "actions",
				key: "actions",
				render: (_, record) => <Button onClick={() => handleEdit(record)}>Edit</Button>,
			};

			setColumns([...baseColumns, ...driveColumns, actionColumn]);
			setStudents(studentData);
		} catch (error) {
			console.error(error);
			message.error("Failed to fetch data");
		}
	};

	const handleToggleVaccination = async (studentId, driveName, newValue) => {
		try {
			await axios.put(`${import.meta.env.VITE_APP_API_URL}/students/vaccination/${studentId}`, {
				drive: driveName,
				status: newValue,
			});
			message.success(`Updated ${driveName} vaccination for student ${studentId}`);
			// Re-fetch students to reflect latest data
			fetchColumnsAndStudents();
		} catch (err) {
			console.error(err);
			message.error(err.response.data.message || "Failed to update vaccination status");
		}
	};

	return <Table columns={columns} dataSource={students} rowKey='id' />;
};

export default StudentTable;
