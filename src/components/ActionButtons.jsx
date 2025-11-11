import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActionButtons = ({ onEdit, onDelete, ...rest }) => {
  return (
    <div {...rest}>
      <Tooltip title="Editar">
        <IconButton size="small" onClick={onEdit} aria-label="editar">
          <FaEdit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Excluir">
        <IconButton size="small" color="error" onClick={onDelete} aria-label="excluir">
          <FaTrash />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
