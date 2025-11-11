import React from "react";
import { Paper, Typography, Alert } from "@mui/material";
import InfoBanner from "../components/InfoBanner.class";

const AdminPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <InfoBanner title="Painel Administrativo" subtitle="Rota protegida (PrivateRoute)" />
      <Alert severity="info" sx={{ mt: 2 }}>
        Somente usuários autenticados devem ver isto. (Use sessionStorage para simular login.)
      </Alert>
      <Typography sx={{ mt: 2 }}>
        Gráficos, relatórios, etc
      </Typography>
    </Paper>
  );
};

export default AdminPage;
