import React from "react";
// @material-ui/core components

import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import orderService from "../../../../services/orderService";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import SuiBox from "../../../../components/SuiBox";
import Footer from "../../../../examples/Footer";
import SuiTypography from "../../../../components/SuiTypography";
import SuiInput from "../../../../components/SuiInput";
import SuiButton from "../../../../components/SuiButton";
import SuiSelect from "../../../../components/SuiSelect";
import productService from "../../../../services/productService";
import Item from "./components/Item";

export default function OrderCreate() {
  const { register, handleSubmit, setValue, control } = useForm();
  const { id } = useParams();
  const history = useHistory();
  const [items, setItems] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await productService.list({ size: 200 });
      setProducts(data.items);
    })();
  }, []);

  function addProduct(productId) {
    if (!productId) return;
    const oldIndex = items.findIndex((item) => item.product.id === productId);
    const oldItem = items[oldIndex];
    if (oldItem) {
      items[oldIndex] = { ...oldItem, quantity: Number(oldItem.quantity) + 1 };
      setItems([...items]);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const newItems = [
      ...items,
      {
        product,
        quantity: 1,
      },
    ];
    setItems(newItems);
  }

  function removeProduct(productId) {
    const index = items.findIndex((item) => item.product.id === productId);
    const tmp = [...items];
    tmp.splice(index, 1);
    setItems([...tmp]);
  }

  function changeQuantity(productId, quantity) {
    const index = items.findIndex((item) => item.product.id === productId);
    const oldItem = { ...items[index] };
    items[index] = { ...oldItem, quantity };
    setItems([...items]);
  }

  async function create(payload) {
    try {
      await orderService.create(payload);
      toast.success("Created");
      window.setTimeout(() => history.push("/order"), 500);
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function update(payload) {
    try {
      await orderService.update(id, payload);
      toast.success("Updated");
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function onSubmit(form) {
    const payload = {
      ...form,
      items: items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        total: item.quantity * item.product.price,
      })),
    };
    if (id) {
      update(payload);
    } else {
      create(payload);
    }
  }

  async function fetchOrder() {
    try {
      const { data } = await orderService.view(id);
      const fields = ["customerPhone", "customerName", "customerAddress", "status"];
      fields.forEach((field) => setValue(field, data[field]));
      setItems(data.items);
    } catch (e) {
      console.log(e);
    }
  }

  function calculateTotal() {
    return items.reduce(
      (total, currentItem) => total + currentItem.product.price * currentItem.quantity,
      0
    );
  }

  const statusOptions = [
    { label: "SUCCESS", value: "success" },
    { label: "PENDING", value: "pending" },
    { label: "SHIPING", value: "shiping" },
    { label: "RETURN", value: "return" },
  ];

  React.useEffect(() => {
    if (id) fetchOrder();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={7}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card style={{ minHeight: "500px" }}>
              <SuiBox mb={3} p={1} component="form" onSubmit={handleSubmit(onSubmit)}>
                <SuiBox mb={3} p={1}>
                  <SuiTypography textTransform="capitalize" fontWeight="bold">
                    Customer
                  </SuiTypography>
                </SuiBox>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "sentiment_satisfied_alt", direction: "left" }}
                      placeholder="customer name ...."
                      {...register("customerName")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "phone", direction: "left" }}
                      placeholder="customer phone ..."
                      {...register("customerPhone")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SuiInput
                      withIcon={{ icon: "home", direction: "left" }}
                      placeholder="Address"
                      {...register("customerAddress")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <SuiSelect
                          {...field}
                          placeholder="Status"
                          onChange={({ value }) => field.onChange(value)}
                          value={statusOptions.find((o) => o.value === field.value)}
                          options={statusOptions}
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
          <Grid item xs={12} lg={8} overflow="visible">
            <Card style={{ minHeight: "500px" }}>
              <SuiBox pl={3} pt={3} pr={3} display="flex" justifyContent="space-between">
                <SuiTypography textTransform="capitalize" fontWeight="bold">
                  Product
                </SuiTypography>
                <SuiTypography textTransform="capitalize" fontWeight="bold">
                  Total: {calculateTotal()}
                </SuiTypography>
              </SuiBox>
              <SuiBox m={3}>
                <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                  <SuiTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    Search product
                  </SuiTypography>
                </SuiBox>
                <SuiSelect
                  onChange={(e) => addProduct(e.value)}
                  options={products.map((item) => ({
                    value: item.id,
                    label: `${item.id.substring(-5, 5)} - ${item.title}  - ${item.price}`,
                  }))}
                />
              </SuiBox>
              <SuiBox pt={1} pb={2} px={2}>
                <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                  {items.map((item) => (
                    <Item
                      key={item.product.id}
                      id={item.product.id}
                      title={item.product.title}
                      price={Number(item.product.price)}
                      image={item.product.image}
                      quantity={Number(item.quantity)}
                      total={Number(item.product.price * item.quantity)}
                      onChangeQuantity={(prodId, quantity) => changeQuantity(prodId, quantity)}
                      onDelete={(prodId) => removeProduct(prodId)}
                    />
                  ))}
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
