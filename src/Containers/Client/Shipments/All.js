/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import './All.css';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ClientContext from '../../../context/client-context';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tables from '../../../Components/Tables/Tables';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import InputTest from '../../../Components/Inputs/BootstrapInput'
import IconButton from '@material-ui/core/Button';
import AddShipment from './AddShipment';
import EditShipment from './EditShipment';

const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 290,
    },
    fixedHeight2: {
      height: 140,
    },
}))

const createData = (id, product, price, quantity, name, address, city, phoneNumber, status, note, productID, shipmentID) => {
    return { id, product, price, quantity, name, address, city, phoneNumber, status, note, productID, shipmentID  };
  }


const All = (props) => {

    const clientContext = useContext(ClientContext);

    const conditions = [
        {value: 'id', label: 'ID'},
        {value: 'productTitle', label: 'Produit'},
        {value: 'price', label: 'Prix'},
        {value: 'quantity', label: 'Quantité'},
        {value: 'name', label: 'Nom'},
        {value: 'adress', label: 'Adresse'},
        {value: 'city', label: 'Ville'},
        {value: 'phoneNumber', label: 'Telephone'},
        {value: 'status', label: 'Status'},
    ]
    const dataHeader = ['ID', 'Produit', 'Prix', 'Quantité', 'Nom', 'Adresse', 'Ville', 'Telephone', 'Status', 'Remarque'];
    const [dataValues, setDataValues] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterVar, setFilterVar] = useState("");
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [shipmentToEdit, setShipmentToEdit] = useState({});

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
      };
    
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const filterByHandler = (filter) => {
        setFilterBy(filter.target.value);
    }
    const filterVarHandler = (filter) => {
        setFilterVar(filter.target.value);
    }

    const filterButtonHandler = () => {
        if (clientContext) {
            if (filterBy !== "")
            {
                const rgx =new RegExp(filterVar)
                let tmp0 = [];
                if (filterBy !== "id") {
                        tmp0 = clientContext.data.shipments.filter((shipment) => ("" + shipment[filterBy]).match(rgx))
                    }
                else if (+filterVar < clientContext.data.shipments.length) {
                    tmp0 = [clientContext.data.shipments[+filterVar]];
                }
                const tmp = tmp0.map((shipment) => {  
                    return createData(clientContext.data.shipments.indexOf(shipment), shipment.productTitle, shipment.price, shipment.quantity, shipment.name, shipment.adress, shipment.city, shipment.phoneNumber, shipment.status, shipment.note, shipment.productID, shipment.id);
                })
                setDataValues(tmp);
            }
            else {
                const tmp = clientContext.data.shipments ? clientContext.data.shipments.map((shipment, index) => {  
                    return createData(clientContext.data.shipments.indexOf(shipment), shipment.productTitle, shipment.price, shipment.quantity, shipment.name, shipment.adress, shipment.city, shipment.phoneNumber, shipment.status, shipment.note, shipment.productID, shipment.id);
                }) : [];
                console.log(tmp);
                setDataValues(tmp);
            }
        }
    }

    useEffect(() => {
        document.title= "Colis | Odelivery";
        filterButtonHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientContext.data.shipments]);

    const classes = useStyles();
    const editShipmentHandler = (shipment) => {
        console.log(shipment);
        setShipmentToEdit(shipment);
        setOpenEdit(true);
    }
    return clientContext ? (
        <> 
            <Grid item xs={12}>
                <div style={{float: 'left'}}>
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Colis
                        <IconButton
                            color="primary"
                            aria-label="Add Shipment"
                            onClick={handleClickOpenAdd}
                            component="span">
                                <AddIcon/>
                        </IconButton>
                    </Typography>
                    
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{float: 'left'}}>
                    <InputTest
                        filterBy={filterByHandler}
                        filterVar={filterVarHandler}
                        filter={filterButtonHandler}
                        conditions={conditions}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Tables header={dataHeader} rows={dataValues} actions={true} shipmentRowActions={true} editShipmentHandler={editShipmentHandler}/>
                    </Paper>
            </Grid>
            <AddShipment handleCloseAdd={handleCloseAdd} openAdd={openAdd}/>
            <EditShipment handleCloseEdit={handleCloseEdit} openEdit={openEdit} shipmentToEdit={shipmentToEdit}/>
        </>
    ) : null;
};

export default  withRouter(All);