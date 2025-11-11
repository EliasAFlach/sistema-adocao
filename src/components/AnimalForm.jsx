import React, { useEffect } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { useForm } from "../hooks/useForm";

const validate = ({ name, species }) => {
  const errors = {};
  if (!name?.trim()) errors.name = "Informe o nome";
  if (!species?.trim()) errors.species = "Informe a espécie";
  return errors;
};

const AnimalForm = ({ initialValues, onSubmit, onCancel }) => {
  const { values, errors, handleChange, handleSubmit, reset, setValues } = useForm(
    initialValues,
    { validate, onSubmit }
  );

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  const isEditing = Boolean(values.id);

  return (
    <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit} className="grid-gap">
        <TextField
          label="Nome"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
        />
        <TextField
          label="Espécie"
          name="species"
          value={values.species || ""}
          onChange={handleChange}
          error={Boolean(errors.species)}
          helperText={errors.species}
          placeholder="Cachorro, Gato..."
          required
        />
        <TextField
          label="Idade (anos)"
          name="age"
          type="number"
          value={values.age ?? ""}
          onChange={handleChange}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="URL da Foto"
          name="photoUrl"
          value={values.photoUrl || ""}
          onChange={handleChange}
          placeholder="https://..."
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button variant="text" onClick={() => reset(initialValues)}>Limpar</Button>
          <Button variant="contained" type="submit">
            {isEditing ? "Salvar alterações" : "Adicionar animal"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnimalForm;
