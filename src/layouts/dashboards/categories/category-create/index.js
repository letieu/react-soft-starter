import React from "react";
// @material-ui/core components

import { useForm } from "react-hook-form";
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
import categoryService from "../../../../services/categoryService";

export default function CategoryCreate() {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const history = useHistory();

  async function create(payload) {
    try {
      await categoryService.create(payload);
      toast.success("Created");
      window.setTimeout(() => history.push("/category"), 500);
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function update(payload) {
    try {
      await categoryService.update(id, payload);
      toast.success("Updated");
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function onSubmit(form) {
    const payload = form;
    if (id) {
      update(payload);
    } else {
      create(payload);
    }
  }

  async function fetch() {
    try {
      const { data } = await categoryService.view(id);
      data.category = data.category.id;
      const fields = ["title", "description", "activated"];
      fields.forEach((field) => setValue(field, data[field]));
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
                    Title
                  </SuiTypography>
                </SuiBox>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "visibility", direction: "left" }}
                      placeholder="title..."
                      {...register("title")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "description", direction: "left" }}
                      placeholder="description..."
                      {...register("description")}
                    />
                  </Grid>
                  <Grid item xs={12} ml={2}>
                    <FormControlLabel
                      control={<Checkbox {...register("activated")} />}
                      label="Active thi category"
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
