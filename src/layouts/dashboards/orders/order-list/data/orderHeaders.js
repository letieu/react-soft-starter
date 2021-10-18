/**
=========================================================
* Soft UI Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts/dashboards/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/dashboards/orders/order-list/components/StatusCell";
import dateFormat from "dateformat";
import ActionCell from "../components/ActionCell";

const getHeaders = ({ handleDelete, handleEdit, handleView }) => [
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => <DefaultCell value={dateFormat(value, "dd/mm/yy")} />,
  },
  {
    Header: "Customer name",
    accessor: "customerName",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Customer phone",
    accessor: "customerPhone",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Customer address",
    accessor: "customerAddress",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "status",
    accessor: "status",
    Cell: ({ value }) => {
      let status;

      if (value === "success") {
        status = <StatusCell icon="done" color="success" status="Success" />;
      } else if (value === "return") {
        status = <StatusCell icon="replay" color="dark" status="Refund" />;
      } else if (value === "shiping") {
        status = <StatusCell icon="send" color="waring" status="Shipping" />;
      } else {
        status = <StatusCell icon="hourglass_empty" color="error" status="Pending" />;
      }

      return status;
    },
  },
  {
    Header: "No product",
    accessor: "items",
    Cell: ({ value }) => <DefaultCell value={value?.length} suffix={false} />,
  },
  { Header: "Total", accessor: "total", Cell: ({ value }) => <DefaultCell value={value} /> },
  {
    Header: "Author",
    accessor: "createdBy",
    Cell: ({ value }) => <DefaultCell value={value?.title} />,
  },
  {
    Header: "Action",
    accessor: "_id",
    align: "right",
    Cell: ({ value }) => (
      <ActionCell onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={value} />
    ),
  },
];

export default getHeaders;
