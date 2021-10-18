/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts/dashboards/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/dashboards/orders/order-list/components/StatusCell";
import ActionCell from "../components/ActionCell";

const getHeaders = ({ handleDelete, handleEdit, handleView }) => [
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value }) => (
      <img
        width="70px"
        style={{ borderRadius: "5px" }}
        alt="img"
        src={value || "https://via.placeholder.com/150"}
      />
    ),
  },
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
    Header: "Category",
    accessor: "category",
    Cell: ({ value }) => <DefaultCell value={value?.title} />,
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
  { Header: "Price", accessor: "price", Cell: ({ value }) => <DefaultCell value={value} /> },
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
