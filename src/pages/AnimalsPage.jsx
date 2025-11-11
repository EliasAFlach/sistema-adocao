import React, { useEffect, useMemo, useState } from "react";
import { Paper, Typography, Divider, Snackbar, Alert, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals, createAnimal, updateAnimal, deleteAnimal, clearError } from "../features/animals/animalsSlice";
import { useNavigate } from "react-router-dom";

import AnimalForm from "../components/AnimalForm";
import AnimalTable from "../components/AnimalTable";
import ConfirmDialog from "../components/ConfirmDialog";
import InfoBanner from "../components/InfoBanner.class";

const AnimalsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector(state => state.animals);

  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, targetId: null, message: "" });
  const [toast, setToast] = useState({ open: false, severity: "success", message: "" });

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const data = useMemo(() => list, [list]);

  const handleCreate = async (payload) => {
    try {
      const action = await dispatch(createAnimal(payload));
      if (action.meta.requestStatus === "fulfilled") {
        setToast({ open: true, severity: "success", message: `Animal "${action.payload.name}" cadastrado!` });
      }
    } catch {}
  };

  const handleUpdate = async (values) => {
    try {
      const action = await dispatch(updateAnimal(values));
      if (action.meta.requestStatus === "fulfilled") {
        setEditing(null);
        setToast({ open: true, severity: "info", message: `Animal "${action.payload.name}" atualizado.` });
      }
    } catch {}
  };

  const askDelete = ({ id, name }) => {
    setConfirm({
      open: true,
      targetId: id,
      message: `Tem certeza que deseja excluir "${name}"? Esta ação não poderá ser desfeita.`
    });
  };

  const handleDelete = async () => {
    const { targetId } = confirm;
    const action = await dispatch(deleteAnimal(targetId));
    if (action.meta.requestStatus === "fulfilled") {
      setToast({ open: true, severity: "warning", message: `Animal removido.` });
    }
    setConfirm({ open: false, targetId: null, message: "" });
  };

  const handleSelectForEdit = (id) => {
    const found = list.find(a => a.id === id);
    setEditing(found ?? null);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <InfoBanner title="Sistema de Adoção" subtitle="CRUD com json-server, Redux, Router e Query" />
      <Divider className="mt-16" />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2, mb: 1 }}>
        <Typography variant="h6">Cadastro de Animais</Typography>
        <Box sx={{ flex: 1 }} />
        <Button onClick={() => navigate("/explore")} variant="outlined">Explorar Raças</Button>
      </Box>

      <AnimalForm
        key={editing?.id ?? "new"}
        initialValues={editing ?? { name: "", species: "", age: "", photoUrl: "" }}
        onSubmit={(values) => (editing ? handleUpdate(values) : handleCreate(values))}
        onCancel={editing ? () => setEditing(null) : undefined}
      />

      <Typography variant="h6" className="mt-24" gutterBottom>
        Lista de Animais
      </Typography>

      {loading ? (
        <Box sx={{ p: 2, fontStyle: "italic" }}>Carregando...</Box>
      ) : error ? (
        <Alert severity="error" onClose={() => dispatch(clearError())}>{error}</Alert>
      ) : data.length === 0 ? (
        <Box sx={{ p: 2 }}>Nenhum animal cadastrado ainda.</Box>
      ) : (
        <AnimalTable
          data={data}
          onEdit={handleSelectForEdit}
          onDelete={askDelete}
        />
      )}

      <ConfirmDialog
        open={confirm.open}
        message={confirm.message}
        onConfirm={handleDelete}
        onClose={() => setConfirm({ open: false, targetId: null, message: "" })}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
          severity={toast.severity}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AnimalsPage;
