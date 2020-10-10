import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ClientContext from '../../../context/client-context';
import firebase from '../../../firebase';
import uuid from 'react-uuid';


const AddShipment = (props) => {
    const clientContext = useContext(ClientContext);
    const initialValues = {
      name: '',
      adress: '',
      phoneNumber: '',
      city: '',
      clientID: firebase.auth.currentUser.uid,
      price: 0,
      productID: '',
      productTitle: '',
      quantity: 0,
      status: 'Prés',
      note: ''
  }

  let cities = ["Casablanca", "Mohammedia", "Rabat" ,"Agadir", "Marrakech"];
    const [value, setValue] = useState(initialValues);
    const [newProduct, setNewProduct] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const addShipment = () => {
      firebase.addShipment(value).then((res) => {
          clientContext.fetchData();
          if (value.status === "Prés")
          {
              const ticketsWaitingForPickup = clientContext.data.tickets.find(ticket => ticket.status === "Prés" && ticket.shipments.length <= 9)
              console.log(ticketsWaitingForPickup);
              if (ticketsWaitingForPickup)
              {
                  ticketsWaitingForPickup.shipments.push(res)
                  firebase.editTicket(ticketsWaitingForPickup, ticketsWaitingForPickup.id)
              }
              else {
                  firebase.addTicket({
                      uuid: uuid(),
                      status: "Prés",
                      shipments: [res],
                  })
              }
          }
          props.handleCloseAdd();
      }
  )}

  const addProductbyId = (e) => {
    if (e.target.value !== 'newProd')
    {
      setNewProduct(false);
      if (e.target.value !== '') 
      {
        console.log(e.target.value);
        const prod = clientContext.data.products.find(prod => prod.id === e.target.value);
        console.log(prod);
        setValue({...value, productID: e.target.value, productTitle: prod.title})
      }
    }
    else
      setNewProduct(true);
  }

  return clientContext.data ? (
    <div>
      <Dialog fullScreen={fullScreen} open={props.openAdd} onClose={props.handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un colis</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nom"
              type="text"
              onChange={e => setValue({...value, name: e.target.value})}
              fullWidth
            />
          <FormControl>
              <InputLabel htmlFor="Produit">Produit</InputLabel>
              <Select
                native
                onChange={addProductbyId}
                input={<Input id="Produit" />}
              >
                <option aria-label="None" value="" /> 
                <option value={'newProd'}>Un nouveau produit</option>
                {
                  clientContext.data.products.map((prod, index) => <option key={index} value={prod.id}>{prod.title}</option>)
                }
              </Select>
            </FormControl>
            {newProduct ? (
              <>
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
            </>
            ): null}
          <TextField
            autoFocus
            value={value.quantity}
            margin="dense"
            id="quantity"
            label="Quantité"
            type="number"
            onChange={e => setValue({
              ...value,
              quantity: +e.target.value,
              price: value.productID !== '' ? +(clientContext.data.products.find(prod => prod.id ===value.productID).unitPrice) * e.target.value : 0})}
            fullWidth
          />
          <TextField
            autoFocus
            value={value.productID !== '' ? value.price : null}
            margin="dense"
            id="price"
            label="Prix"
            type="number"
            onChange={e => setValue({...value, price: +e.target.value})}
            fullWidth
          />
          <FormControl>
              <InputLabel htmlFor="Ville">Ville</InputLabel>
              <Select
                native
                value={value.city}
                onChange={(e) => setValue({...value, city: e.target.value})}
                input={<Input id="Ville" />}
              >
                <option aria-label="None" value="" />
                {
                  cities.map((city, index) => <option key={index} value={city}>{city}</option>)
                }
              </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="adress"
            label="Adresse"
            type="text"
            onChange={e => setValue({...value, adress: e.target.value})}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Telephone"
            type="text"
            onChange={e => setValue({...value, phoneNumber: e.target.value})}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Remarque"
            type="text"
            onChange={e => setValue({...value, note: e.target.value})}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAdd} color="primary">
            Annuler
          </Button>
          <Button onClick={addShipment} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ): null;
}

export default AddShipment;