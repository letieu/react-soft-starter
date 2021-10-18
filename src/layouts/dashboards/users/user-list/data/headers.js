/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts/dashboards/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/dashboards/orders/order-list/components/StatusCell";
import ActionCell from "../components/ActionCell";

const getHeaders = ({ handleDelete, handleEdit, handleView }) => [
  {
    Header: "Username",
    accessor: "username",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      let status;

      if (value === "active") {
        status = <StatusCell icon="done" color="success" status="Active" />;
      } else {
        status = <StatusCell icon="clear" color="dark" status="Un active" />;
      }

      return status;
    },
  },
  {
    Header: "Action",
    align: "right",
    hideSort: true,
    accessor: "_id",
    Cell: ({ value }) => (
      <ActionCell onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={value} />
    ),
  },
];

export default getHeaders;
