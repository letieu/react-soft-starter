import React, { useState } from "react";
// @material-ui/core components

import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Checkbox, FormControlLabel } from "@mui/material";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import SuiBox from "../../../../components/SuiBox";
import Footer from "../../../../examples/Footer";
import SuiTypography from "../../../../components/SuiTypography";
import SuiInput from "../../../../components/SuiInput";
import SuiButton from "../../../../components/SuiButton";
import userService from "../../../../services/userService";

export default function UserCreate() {
  const { register, handleSubmit, setValue, control } = useForm();
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const history = useHistory();

  async function create(payload) {
    try {
      await userService.create(payload);
      toast.success("Created");
      window.setTimeout(() => history.push("/user"), 500);
    } catch (e) {
      const message = e?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message);
      console.log(e);
    }
  }

  async function update(payload) {
    try {
      await userService.update(id, payload);
      toast.success("Updated");
    } catch (e) {
      const message = e?.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  }

  async function onSubmit(form) {
    const payload = { ...form, password, status: form.status ? "active" : "unactive" };
    if (id) {
      update(payload);
    } else {
      create(payload);
    }
  }

  async function fetch() {
    try {
      const { data } = await userService.view(id);
      const fields = ["username", "email", "title"];
      fields.forEach((field) => setValue(field, data[field]));
      setValue("status", data.status === "active");
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    if (id) fetch();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={7}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card style={{ minHeight: "500px" }}>
              <SuiBox mb={3} p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <SuiBox mb={3} p={1}>
                  <SuiTypography textTransform="capitalize" fontWeight="bold">
                    User
                  </SuiTypography>
                </SuiBox>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "face", direction: "left" }}
                      placeholder="username"
                      {...register("username")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "description", direction: "left" }}
                      placeholder="title"
                      {...register("title")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "email", direction: "left" }}
                      placeholder="email"
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "password", direction: "left" }}
                      placeholder="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Grid>
                  <Grid item xs={12} ml={2}>
                    <FormControlLabel
                      control={
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => {
                            // eslint-disable-next-line no-param-reassign
                            if (!field?.value) field.value = false;
                            return (
                              <Checkbox
                                placeholder="Status"
                                onChange={(e) => {
                                  field.onChange(e.target.checked);
                                }}
                                checked={field.value}
                              />
                            );
                          }}
                        />
                      }
                      label="Active user"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiButton variant="gradient" buttonColor="primary" type="submit">
                      Submit
                    </SuiButton>
                  </Grid>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
