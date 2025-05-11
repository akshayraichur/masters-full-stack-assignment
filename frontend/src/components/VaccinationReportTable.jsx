import { Table, Tag } from "antd";

const columns = [
	{
		title: "Student Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Class",
		dataIndex: "class",
		key: "class",
	},
	{
		title: "Vaccine",
		dataIndex: "vaccineName",
		key: "vaccineName",
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status) => (
			<Tag color={status ? "green" : "red"}>{status ? "Vaccinated" : "Not Vaccinated"}</Tag>
		),
	},
];

export const VaccinationReportTable = ({ reportData }) => {
	// Flattening nested vaccinations array into individual rows
	const dataSource = reportData.flatMap((student, index) =>
		student.vaccinations.map((vaccine, i) => ({
			key: `${index}-${i}`,
			name: student.name,
			class: student.class,
			vaccineName: vaccine.vaccineName,
			date: vaccine.date,
			status: student.vaccination_status,
		}))
	);

	return <Table columns={columns} dataSource={dataSource} />;
};
