/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts/dashboards/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/dashboards/orders/order-list/components/StatusCell";
import ActionCell from "../components/ActionCell";

const getHeaders = ({ handleDelete, handleEdit, handleView }) => [
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "status",
    accessor: "activated",
    Cell: ({ value }) => {
      let status;

      if (value) {
        status = <StatusCell icon="done" color="success" status="Active" />;
      } else {
        status = <StatusCell icon="replay" color="dark" status="Un active" />;
      }

      return status;
    },
  },
  {
    Header: "Action",
    accessor: "_id",
    align: "right",
    hideSort: true,
    Cell: ({ value }) => (
      <ActionCell onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={value} />
    ),
  },
];

export default getHeaders;
