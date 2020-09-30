import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ClientContext from '../../../context/client-context';
import firebase from '../../../firebase';
import uuid from 'react-uuid';


const AddProduct = (props) => {
    const clientContext = useContext(ClientContext);
    const initialValues = {
        title: '',
        unitPrice: 0,
        initialQuantity: 0,
        sold: 0,
    }
    const [value, setValue] = useState(initialValues);
    useEffect(() => {
        document.title = "Ajout de Produit";
    }, [])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const addProduct = () => {
        console.log(value);
        firebase.addProduct({...value, id: uuid()}).then(() => {
            clientContext.fetchData();
            props.handleCloseAdd();
        })
    }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={props.openAdd} onClose={props.handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un produit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titre"
            label="Titre"
            type="text"
            onChange={e => setValue({...value, title: e.target.value})}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="initialQuantity"
            label="Quantité Initial"
            type="number"
            onChange={e => setValue({...value, initialQuantity: +e.target.value})}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="unitPrice"
            label="Prix"
            type="number"
            onChange={e => setValue({...value, unitPrice: +e.target.value})}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAdd} color="primary">
            Annuler
          </Button>
          <Button onClick={addProduct} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddProduct;