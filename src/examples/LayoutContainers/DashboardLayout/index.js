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

// react-router-dom components
import { useHistory, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import "react-toastify/dist/ReactToastify.css";

// Custom styles for the LayoutContainer
import styles from "examples/LayoutContainers/DashboardLayout/styles";
import { useSoftUIController } from "context";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "../../../context/userContext";
import authService from "../../../services/authService";
import jwtManager from "../../../helper/jwtManager";
// Soft UI Dashboard PRO React context

function LayoutContainer({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction } = controller;
  const { pathname } = useLocation();
  const classes = styles({ miniSidenav, direction });
  const [user, setUser] = useState({});
  const history = useHistory();

  async function fetchMe() {
    try {
      const { data } = await authService.me();
      setUser(data);
    } catch (e) {
      jwtManager.clear();
      history.push("/login");
    }
  }

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "dashboard" });
  }, [pathname]);

  return (
    <UserProvider value={user}>
      <ToastContainer />
      <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>;
    </UserProvider>
  );
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
