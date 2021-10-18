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

/** 
  All of the routes for the Soft UI Dashboard PRO Material are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
import Default from "layouts/dashboards/default";
import OrderList from "layouts/dashboards/orders/order-list";

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import { CardTravel, Category, Inventory2, People } from "@mui/icons-material";
import Basic from "./layouts/authentication/sign-in/basic";
// eslint-disable-next-line import/no-named-default
import { default as RegisterBasic } from "./layouts/authentication/sign-up/basic";
import OrderCreate from "./layouts/dashboards/orders/order-create/orderCreate";
import ProductList from "./layouts/dashboards/products/product-list";
import ProductCreate from "./layouts/dashboards/products/product-create";
import CategoryList from "./layouts/dashboards/categories/category-list";
import CategoryCreate from "./layouts/dashboards/categories/category-create";
import UserList from "./layouts/dashboards/users/user-list";
import UserCreate from "./layouts/dashboards/users/user-create";

const routes = [
  // AUTH ===========================================================================
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: Basic,
  },
  {
    name: "Register",
    key: "register",
    route: "/register",
    component: RegisterBasic,
  },
  {
    name: "Dashboards",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: Default,
  },
  // ORDER =========================================================================
  {
    name: "Create order",
    key: "order_create",
    route: "/order/create",
    component: OrderCreate,
  },
  {
    name: "Edit order",
    key: "order_edit",
    route: "/order/:id",
    component: OrderCreate,
  },

  // Product =========================================================================
  {
    name: "Create product",
    key: "product_create",
    route: "/product/create",
    component: ProductCreate,
  },
  {
    name: "Edit product",
    key: "product_edit",
    route: "/product/:id",
    component: ProductCreate,
  },

  // Category =========================================================================
  {
    name: "Create category",
    key: "category_create",
    route: "/category/create",
    component: CategoryCreate,
  },
  {
    name: "Edit category",
    key: "category_edit",
    route: "/category/:id",
    component: CategoryCreate,
  },

  // User =========================================================================
  {
    name: "Create user",
    key: "user_create",
    route: "/user/create",
    component: UserCreate,
  },
  {
    name: "Edit user",
    key: "user_edit",
    route: "/user/:id",
    component: UserCreate,
  },
  // SIDE BAR ======================================================================
  { type: "title", title: "Pages", key: "title-pages" },
  {
    name: "Orders",
    key: "order-list",
    icon: <CardTravel size="12px" />,
    type: "collapse",
    route: "/order",
    component: OrderList,
    noCollapse: true,
  },
  {
    name: "Products",
    key: "product-list",
    icon: <Inventory2 size="12px" />,
    type: "collapse",
    route: "/product",
    component: ProductList,
    noCollapse: true,
  },
  {
    name: "Categories",
    key: "category-list",
    icon: <Category size="12px" />,
    type: "collapse",
    route: "/category",
    component: CategoryList,
    noCollapse: true,
  },
  {
    name: "Users",
    key: "user-list",
    icon: <People size="12px" />,
    type: "collapse",
    route: "/user",
    component: UserList,
    noCollapse: true,
  },
];

export default routes;
