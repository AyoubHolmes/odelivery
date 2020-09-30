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
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

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

const createData = (id, title, unitPrice, sold, left, initialQuantity, productID) => {
    return { id, title, unitPrice, sold, left, initialQuantity, productID };
  }


const All = (props) => {

    const clientContext = useContext(ClientContext);

    const dataHeader = ['ID', 'Titre', 'Prix d\'unité', 'Vendu', 'Reste', 'Quantité Initiale'];
    const [dataValues, setDataValues] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterVar, setFilterVar] = useState("");
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
    
    const conditions = [
        {value: 'id', label: 'ID'},
        {value: 'title', label: 'Titre'},
        {value: 'unitPrice', label: 'Prix d\'unité'},
        {value: 'sold', label: 'Vendu'},
        {value: 'left', label: 'Reste'},
        {value: 'initialQuantity', label: 'Quantité Initiale'},
    ]

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
        console.log(clientContext.data.products);
        if (filterBy !== "" && filterBy !== "left")
        {
            const rgx =new RegExp(filterVar)
            let tmp0 = [];
            if (filterBy !== "id") {
                    tmp0 = clientContext.data.products.filter((product) => ("" + product[filterBy]).match(rgx))
                }
            else if (+filterVar < clientContext.data.products.length) {
                tmp0 = [clientContext.data.products[+filterVar]];
            }
            const tmp = tmp0.map((product, index) => {  
                const shipmentsByProduct = clientContext.data.shipments.filter(shipment => (shipment.status ==='Livré' 
                    || shipment.status ==='Facturé') && shipment.productID === index);
                let r = 0;
                for(let i = 0; i < shipmentsByProduct.length; i++) {
                    r += shipmentsByProduct[i].quantity;
                }
                const test = createData(clientContext.data.products.indexOf(product), product.title, product.unitPrice, r, product.initialQuantity - r, product.initialQuantity, product.id)
                console.log(test);
                return test
            })
            setDataValues(tmp);
        }
        else if (filterBy === "left") {
            let tmp = clientContext.data.products.map((product, index) => {  
                const shipmentsByProduct = clientContext.data.shipments.filter(shipment => (shipment.status ==='Livré' 
                    || shipment.status ==='Facturé') && shipment.productID === index);
                let r = 0;
                for(let i = 0; i < shipmentsByProduct.length; i++) {
                    r += shipmentsByProduct[i].quantity;
                }
                const test = createData(clientContext.data.products.indexOf(product), product.title, product.unitPrice, r, product.initialQuantity - r, product.initialQuantity, product.id)
                console.log(test);
                return test

            })
            tmp = tmp.filter(t => t.left === +filterVar)
            setDataValues(tmp);
        }
        else {
            const tmp = clientContext.data.products ? clientContext.data.products.map((product, index) => {  
                const shipmentsByProduct = clientContext.data.shipments.filter(shipment => (shipment.status ==='Livré' 
                    || shipment.status ==='Facturé') && shipment.productID === product.id);
                let r = 0;
                console.log(shipmentsByProduct);
                for(let i = 0; i < shipmentsByProduct.length; i++) {
                    r += shipmentsByProduct[i].quantity;
                }
                const test = createData(clientContext.data.products.indexOf(product), product.title, product.unitPrice, r, product.initialQuantity - r, product.initialQuantity, product.id)
                console.log(test);
                return test
            }) : [];
            console.log(tmp);
            setDataValues(tmp);
        }
    }

    useEffect(() => {
        document.title= "Produits | Odelivery";
        filterButtonHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientContext.data.products]);

    const classes = useStyles();
    const editProductHandler = (product) => {
        console.log(product);
        setProductToEdit({...product});
        setOpenEdit(true);
        console.log("edit test");
    }
    return (
        <> 
            <Grid item xs={12}>
                <div style={{float: 'left'}}>
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Produits
                        <IconButton
                            color="primary"
                            aria-label="Add Product"
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
                        addFunc={()=>props.history.push(props.match.url + '/add')}
                        filterBy={filterByHandler}
                        filterVar={filterVarHandler}
                        filter={filterButtonHandler}
                        conditions={conditions}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Tables header={dataHeader} rows={dataValues} actions={true} productRowActions={true} editProductHandler={editProductHandler}/>
                    </Paper>
            </Grid>
            <AddProduct handleCloseAdd={handleCloseAdd} openAdd={openAdd}/>
            <EditProduct handleCloseEdit={handleCloseEdit} openEdit={openEdit} productToEdit={productToEdit}/>
        </>
    );
};

export default  withRouter(All);