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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SuiTypography from "components/SuiTypography";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import SuiBox from "../../../../../../components/SuiBox";

function ActionCell({ id, onDelete, onEdit, onView }) {
  return (
    <SuiBox display="flex" alignItems="center">
      <SuiTypography
        variant="body1"
        textColor="secondary"
        customClass="cursor-pointer line-height-0"
      >
        <Tooltip title="Preview" placement="top">
          <Icon className="" color="success" onClick={() => onView(id)}>
            visibility
          </Icon>
        </Tooltip>
      </SuiTypography>
      <SuiBox mx={2}>
        <SuiTypography
          variant="body1"
          textColor="secondary"
          customClass="cursor-pointer line-height-0"
        >
          <Tooltip title="Edit" placement="top">
            <Icon className="" color="warning" onClick={() => onEdit(id)}>
              edit
            </Icon>
          </Tooltip>
        </SuiTypography>
      </SuiBox>
      <SuiTypography
        variant="body1"
        textColor="secondary"
        customClass="cursor-pointer line-height-0"
      >
        <Tooltip title="Delete" placement="left">
          <Icon className="" color="error" onClick={() => onDelete(id)}>
            delete
          </Icon>
        </Tooltip>
      </SuiTypography>
    </SuiBox>
  );
}

// Typechecking props for the DefaultCell
ActionCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default ActionCell;
