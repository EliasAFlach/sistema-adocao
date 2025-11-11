import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography, Box, Button } from "@mui/material";

const AnimalDetails = () => {
  const { id } = useParams();
  const animal = useSelector(s => s.animals.list.find(a => String(a.id) === String(id)));

  if (!animal) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Animal não encontrado</Typography>
        <Button sx={{ mt: 2 }} component={RouterLink} to="/animals" variant="outlined">Voltar</Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, display: "grid", gap: 2 }}>
      <Typography variant="h5">{animal.name}</Typography>
      {animal.photoUrl && <img src={animal.photoUrl} alt={animal.name} className="photo" style={{ width: 160, height: 160 }} />}
      <Box>Espécie: <strong>{animal.species}</strong></Box>
      <Box>Idade: <strong>{animal.age ?? "—"}</strong></Box>
      <Button component={RouterLink} to="/animals" variant="outlined">Voltar</Button>
    </Paper>
  );
};

export default AnimalDetails;
