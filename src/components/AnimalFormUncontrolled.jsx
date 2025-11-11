import React, { useRef } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";

const AnimalFormUncontrolled = ({ onSubmit }) => {
  const nameRef = useRef();
  const speciesRef = useRef();
  const ageRef = useRef();
  const photoRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      species: speciesRef.current.value,
      age: Number(ageRef.current.value) || 0,
      photoUrl: photoRef.current.value
    };
    onSubmit(payload);
    e.target.reset();
  };

  return (
    <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit} className="grid-gap">
        <TextField inputRef={nameRef} label="Nome (uncontrolled)" required />
        <TextField inputRef={speciesRef} label="Espécie" required />
        <TextField inputRef={ageRef} label="Idade (anos)" type="number" inputProps={{ min: 0 }} />
        <TextField inputRef={photoRef} label="URL da Foto" placeholder="https://..." />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
          <Button variant="contained" type="submit">Adicionar (uncontrolled)</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnimalFormUncontrolled;
