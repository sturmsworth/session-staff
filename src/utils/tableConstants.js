import AdminTableCompletionRenderer from "../components/AdminTableCompletionRenderer";

export const adminColumns = [
  {
    Header: "Session Staff Information",
    columns: [
      {
        Header: "Name",
        accessor: "displayName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Position",
        accessor: "position",
      },
    ],
  },
  {
    Header: "Session Staff Application Status",
    columns: [
      {
        Header: "Completion Status",
        id: "Expanded Status",
        accessor: "completed",
        Cell: (row) => AdminTableCompletionRenderer(row),
      },
    ],
  },
];
