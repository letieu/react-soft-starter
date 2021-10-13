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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Select from "react-select";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

// Custom styles for SuiSelect
import { styles, animation } from "components/SuiSelect/styles";

const SuiSelect = forwardRef(({ size, error, success, ...rest }, ref) => {
  const classes = animation();

  return (
    <Select
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      className={classes.menu}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: colors.light.main,
          primary: colors.light.main,
        },
      })}
    />
  );
});

// Setting default values for the props of SuiSelect
SuiSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the SuiSelect
SuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default SuiSelect;