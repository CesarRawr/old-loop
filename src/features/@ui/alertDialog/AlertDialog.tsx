import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props: DialogProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {
          props.title
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {
            props.description
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          Cerrar
        </Button>
        {
          !!props.isOptionEnabled && (
            <Button onClick={props.acceptHandler}>
              Aceptar
            </Button>
          )
        }
      </DialogActions>
    </Dialog>
  );
}

interface DialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  isOptionEnabled?: boolean;
  acceptHandler?: () => void;
}
