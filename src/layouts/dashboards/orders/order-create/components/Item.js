import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import FormField from "../../../../ecommerce/products/edit-product/components/FormField";

function Item({ id, title, price, image, quantity, total, onChangeQuantity, onDelete }) {
  console.log(onDelete);
  const [qt, setQt] = useState(quantity);
  useEffect(() => {
    onChangeQuantity(id, qt);
  }, [qt]);

  return (
    <SuiBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      backgroundColor="grey-100"
      borderRadius="lg"
      flexDirection={{ md: "column", lg: "row" }}
      p={3}
      mt={2}
    >
      <SuiBox width="30%" mr={2}>
        <img style={{ borderRadius: "10px" }} width="100px" src={image} alt="" />
      </SuiBox>
      <SuiBox width="70%" display="flex" flexDirection="column">
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SuiTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {title}
          </SuiTypography>

          <SuiBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <SuiBox mr={1}>
              <SuiButton onClick={() => onDelete(id)} variant="text" buttonColor="error">
                <Icon className="">delete</Icon>&nbsp;delete
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
        <SuiBox mb={1} lineHeight={0}>
          <SuiTypography variant="caption" textColor="text">
            Price:&nbsp;&nbsp;&nbsp;
            <SuiTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {price}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={1} display="flex" alignItems="center" lineHeight={0}>
          <SuiTypography variant="caption" textColor="text">
            Quantity:&nbsp;&nbsp;&nbsp;
          </SuiTypography>
          <Grid item xs={12} sm={3}>
            <FormField onChange={(e) => setQt(e.target.value)} value={qt} label="" type="number" />
          </Grid>
        </SuiBox>
        <SuiTypography variant="caption" textColor="text">
          Total:&nbsp;&nbsp;&nbsp;
          <SuiTypography variant="caption" fontWeight="medium">
            {total}
          </SuiTypography>
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

// Typechecking props for the Bill
Item.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  image: PropTypes.string,
  onChangeQuantity: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Item.defaultProps = {
  image: "",
};

export default Item;
