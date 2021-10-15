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

import React, { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved9.jpg";
import { useForm } from "react-hook-form";
import jwtManager from "helper/jwtManager";
import configAxios from "plugins/axios";
import authService from "services/authService";
import { toast } from "react-toastify";

export default function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  async function onSubmit({ username, password }) {
    try {
      const { data } = await authService.login(username, password);

      jwtManager.set(data.access_token);
      configAxios();
      history.push("/admin/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }

  return (
    <BasicLayout title="Welcome!" description="" image={curved9}>
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Sign in
          </SuiTypography>
        </SuiBox>
        <SuiBox p={3}>
          <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <SuiBox mb={2}>
              <SuiInput type="text" placeholder="Username" inputProps={register("username")} />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" inputProps={register("password")} />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={(e) => setRememberMe(e)} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={setRememberMe}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;Remember me
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" buttonColor="info" fullWidth type="submit">
                sign in
              </SuiButton>
            </SuiBox>
            <Separator />
            <SuiBox mt={1} mb={3}>
              <SuiButton
                component={Link}
                to="/register"
                variant="gradient"
                buttonColor="dark"
                fullWidth
              >
                sign up
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}
