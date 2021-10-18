import React, { useState } from "react";
// @material-ui/core components

import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import SuiBox from "../../../../components/SuiBox";
import Footer from "../../../../examples/Footer";
import SuiTypography from "../../../../components/SuiTypography";
import SuiInput from "../../../../components/SuiInput";
import SuiButton from "../../../../components/SuiButton";
import SuiSelect from "../../../../components/SuiSelect";
import productService from "../../../../services/productService";
import categoryService from "../../../../services/categoryService";

export default function ProductCreate() {
  const { register, handleSubmit, setValue, control } = useForm();
  const [categories, setCategories] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const history = useHistory();

  async function create(payload) {
    try {
      await productService.create(payload);
      toast.success("Created");
      window.setTimeout(() => history.push("/product"), 500);
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function update(payload) {
    try {
      await productService.update(id, payload);
      toast.success("Updated");
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function onSubmit(form) {
    const payload = { ...form, image: imgUrl };
    if (id) {
      update(payload);
    } else {
      create(payload);
    }
  }

  async function fetch() {
    try {
      const { data } = await productService.view(id);
      data.category = data.category.id;
      const fields = ["title", "image", "description", "activated", "price", "category"];
      fields.forEach((field) => setValue(field, data[field]));
      setImgUrl(data.image ?? "");
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await categoryService.list();
      setCategories(
        data.items.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      );
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    fetchCategories();
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
                  <Grid item xs={12}>
                    <SuiInput
                      type="number"
                      withIcon={{ icon: "attach_money", direction: "left" }}
                      placeholder="price"
                      {...register("price")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <SuiSelect
                          {...field}
                          placeholder="Category"
                          onChange={({ value }) => field.onChange(value)}
                          value={categories.find((i) => i.value === field.value)}
                          options={categories}
                        />
                      )}
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
          <Grid item p={3} xs={12} lg={4}>
            <Card>
              <SuiBox p={3}>
                <img
                  alt="img"
                  src={imgUrl || "https://via.placeholder.com/300"}
                  width="100%"
                  style={{ borderRadius: "10px" }}
                />
                <SuiInput
                  withIcon={{ icon: "image", direction: "left" }}
                  placeholder="url..."
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
