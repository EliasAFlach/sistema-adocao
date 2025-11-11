import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const MainNav = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Button color="inherit" component={RouterLink} to="/animals">Animais</Button>
        <Button color="inherit" component={RouterLink} to="/explore">Explorar Raças</Button>
        <Box sx={{ flex: 1 }} />
        <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
