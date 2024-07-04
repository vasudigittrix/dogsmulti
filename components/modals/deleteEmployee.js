import { useEffect, useState } from "react";
import { Modal, Paper, Typography, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconPlus } from "@tabler/icons-react";
import NewCustomerDrawer from "../drawers/newcustomer";

export default function DeleteEmployeeModal({isOpen, onClose, deleteEmployee, id}){

    const handleDelete = ()=>{
      if(isOpen){
      deleteEmployee(id);
      onClose();
      }
    }
    return(
        <>
        <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="employee-delete-modal"
        aria-describedby="employee-delete-modal-description"
      >
        <Paper
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "50px auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Delete this Employee?
          </Typography>
          <Button
            variant="contained"
            onClick={handleDelete}
            style={{ marginTop: "20px" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            style={{ marginTop: "20px" }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
        </>
    )
}