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
import getHeaders from "./data/headers";
import confirmService from "../../../../services/confirmService";
import productService from "../../../../services/productService";

function ProductList() {
  const [menu, setMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [activated, setActivated] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  function displayStatus(status) {
    switch (status) {
      case true:
        return "Activated";
      case false:
        return "Un active";
      case null:
        return "Status";
      default:
        return "Status";
    }
  }

  function handleEdit(id) {
    history.push(`/product/${id}`);
  }

  function handleView(id) {
    history.push(`/product/${id}`);
  }

  function handleDelete(id) {
    const handler = async () => {
      await productService.remove(id);
      const index = items.findIndex((i) => i.id === id);
      const tmp = [...items];
      tmp.splice(index, 1);
      setItems(tmp);
    };
    confirmService.remove(handler);
  }

  const columns = getHeaders({ handleEdit, handleDelete, handleView });
  async function fetchItems() {
    setLoading(true);
    try {
      const { data } = await productService.list({ size: 200, activated });
      setItems(data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  function filterStatus(isActivated) {
    closeMenu();
    setActivated(isActivated);
  }

  useEffect(() => {
    fetchItems();
  }, [activated]);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={() => filterStatus(true)}>Status: Active</MenuItem>
      <MenuItem onClick={() => filterStatus(false)}>Status: Un Active</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={() => filterStatus(null)}>
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
          <Link to="/product/create">
            <SuiButton variant="gradient" buttonColor="info">
              new product
            </SuiButton>
          </Link>
          <SuiBox display="flex">
            <SuiButton
              variant={menu ? "contained" : "outlined"}
              buttonColor="dark"
              onClick={openMenu}
            >
              {displayStatus(activated)}&nbsp;
              <Icon className="">keyboard_arrow_down</Icon>
            </SuiButton>
            {renderMenu}
          </SuiBox>
        </SuiBox>
        <Card>
          <DataTable
            table={{ columns, rows: items }}
            entriesPerPage={false}
            loading={loading}
            canSearch
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductList;
