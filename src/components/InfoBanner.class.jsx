import React, { Component } from "react";
import { Box, Typography } from "@mui/material";

class InfoBanner extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <Box sx={{ display: "grid", gap: 0.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
      </Box>
    );
  }
}

export default InfoBanner;
