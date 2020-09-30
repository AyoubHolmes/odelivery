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





const EditProduct = (props) => {
    const clientContext = useContext(ClientContext);
    const initialValues = {
        title: '',
        unitPrice: 0,
        initialQuantity: 0,
        sold: 0
    }
    const [value, setValue] = useState(initialValues);

    useEffect(() => {
        document.title = "Ajout de Produit";
        console.log(props.productToEdit);
        setValue({...props.productToEdit})
    }, [props.productToEdit])

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const editProduct = () => {
      console.log(props.productToEdit);
        firebase.editProduct(value, props.productToEdit.productID).then(() => {
            clientContext.fetchData();
            props.handleCloseEdit();
        })
    }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={props.openEdit} onClose={props.handleCloseEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifer le produit</DialogTitle>
        <DialogContent>
          <TextField
            value={value.title}
            autoFocus
            margin="dense"
            id="titre"
            label="Titre"
            type="text"
            onChange={e => setValue({...value, title: e.target.value})}
            fullWidth
          />
          <TextField
            value={+value.initialQuantity}
            autoFocus
            margin="dense"
            id="initialQuantity"
            label="Quantité Initial"
            type="number"
            onChange={e => setValue({...value, initialQuantity: +e.target.value})}
            fullWidth
          />
          <TextField
            value={+value.unitPrice}
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
          <Button onClick={props.handleCloseEdit} color="primary">
            Annuler
          </Button>
          <Button onClick={editProduct} color="primary">
            Modifer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProduct;