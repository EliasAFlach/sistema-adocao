import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, IconButton, Tooltip
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButtons from "./ActionButtons";

const AnimalTable = ({ data, onEdit, onDelete }) => {
  return (
    <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Foto</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Espécie</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, name, species, age, photoUrl }) => (
            <TableRow key={id} hover>
              <TableCell width={72}>
                {photoUrl ? (
                  <img src={photoUrl} alt={name} className="photo" />
                ) : "—"}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{species}</TableCell>
              <TableCell>{age ?? "—"}</TableCell>
              <TableCell align="right">
                <ActionButtons
                  onEdit={() => onEdit(id)}
                  onDelete={() => onDelete({ id, name })}
                />
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum animal cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AnimalTable;
