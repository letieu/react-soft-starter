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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import orderService from "../../../../services/orderService";
import getHeaders from "./data/orderHeaders";
import confirmService from "../../../../services/confirmService";
import OutlinedCounterCard from "../../../../examples/Cards/CounterCards/OutlinedCounterCard";

function OrderList() {
  const [menu, setMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [report, setReport] = useState({
    pending: 0,
    shiping: 0,
    success: 0,
    return: 0,
    haveValue: false,
  });

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  function handleEdit(id) {
    history.push(`/order/${id}`);
  }

  function handleView(id) {
    history.push(`/order/${id}`);
  }

  function handleDelete(id) {
    const handler = async () => {
      await orderService.remove(id);
      const index = items.findIndex((i) => i.id === id);
      const tmp = [...items];
      tmp.splice(index, 1);
      setItems(tmp);
    };
    confirmService.remove(handler);
  }

  function caculateReport(orders) {
    const newReport = { ...report };
    orders.forEach((o) => {
      newReport[o.status] += 1;
    });
    newReport.haveValue = true;
    return newReport;
  }

  const columns = getHeaders({ handleEdit, handleDelete, handleView });
  async function fetchItems() {
    setLoading(true);
    try {
      const { data } = await orderService.list({ size: 200, status });
      setItems(data.items);
      if (!report.haveValue) {
        setReport(caculateReport(data.items));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  function filterStatus(orderStatus) {
    closeMenu();
    setStatus(orderStatus);
  }

  useEffect(() => {
    fetchItems();
  }, [status]);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={() => filterStatus("pending")}>Status: Pending</MenuItem>
      <MenuItem onClick={() => filterStatus("shiping")}>Status: Shipping</MenuItem>
      <MenuItem onClick={() => filterStatus("success")}>Status: Success</MenuItem>
      <MenuItem onClick={() => filterStatus("return")}>Status: Refund</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={() => filterStatus("")}>
        <SuiTypography variant="button" textColor="error" fontWeight="regular">
          Remove Filter
        </SuiTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Link to="/order/create">
            <SuiButton variant="gradient" buttonColor="info">
              new order
            </SuiButton>
          </Link>
          <SuiBox display="flex">
            <SuiButton
              variant={menu ? "contained" : "outlined"}
              buttonColor="dark"
              onClick={openMenu}
            >
              {status || "Status"}&nbsp;
              <Icon className="">keyboard_arrow_down</Icon>
            </SuiButton>
            {renderMenu}
            <SuiBox ml={1}>
              <SuiButton variant="outlined" buttonColor="dark">
                <Icon className="">description</Icon>
                &nbsp;export csv
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <SuiBox my={2}>
          <Card>
            <SuiBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={report.pending} color="info" title="Pending" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={report.shiping} color="warning" title="Shipping" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={report.success} color="success" title="Success" />
                </Grid>
                <Grid item xs={6} lg={3}>
                  <OutlinedCounterCard count={report.return} color="error" title="Return" />
                </Grid>
              </Grid>
            </SuiBox>
          </Card>
        </SuiBox>
        <Card>
          <DataTable
            table={{ columns, rows: items }}
            entriesPerPage={false}
            canSearch
            loading={loading}
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
