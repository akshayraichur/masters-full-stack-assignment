import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const StudentTable = () => {
	const [columns, setColumns] = useState([]);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetchColumnsAndStudents();
	}, []);

	// const handleEdit = async (student) => {
	// 	setEditStudent(true);
	// 	setForm({ ...student });
	// };

	const fetchColumnsAndStudents = async () => {
		try {
			const [drivesRes, studentsRes] = await Promise.all([
				// axios.get(`${import.meta.env.VITE_APP_API_URL}/vaccination-drives`), // returns ["COVID", "Hepatitis"]
				Promise.resolve(["COVID", "Hepatitis"]),
				axios.get(`${import.meta.env.VITE_APP_API_URL}/students/`), // returns array of students
			]);

			const drives = drivesRes; // drivesRes.data;
			const studentData = studentsRes.data.students;
			console.log(studentData);

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
						checked={!!val}
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

	const handleEdit = (student) => {
		console.log("Edit clicked for:", student);
		// Handle edit logic here
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
			message.error("Failed to update vaccination status");
		}
	};

	return <Table columns={columns} dataSource={students} rowKey='id' />;
};

export default StudentTable;
