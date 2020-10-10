import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ClientContext from '../../../context/client-context';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tables from '../../../Components/Tables/Tables';
import Typography from '@material-ui/core/Typography';
import InputTest from '../../../Components/Inputs/BootstrapInput'

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

const createData = (uuid, status, nbColis, amount, dateCreation, datePayment) => {
    return { uuid, status, nbColis, amount, dateCreation, datePayment };
  }


const Bills = (props) => {

    const clientContext = useContext(ClientContext);

    const dataHeader = ['UUID', 'Statut', 'Nb.colis', 'Montant', 'Date de Creation', 'Date de Verment'];
    const [dataValues, setDataValues] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterVar, setFilterVar] = useState("");

    const conditions = [
        {value: 'uuid', label: 'UUID'},
        {value: 'status', label: 'Statut'},
        {value: 'Nb.colis', label: 'Nb.colis'},
        {value: 'amount', label: 'Montant'},
        {value: 'dateCreation', label: 'Date de Creation'},
        {value: 'datePayment', label: 'Date de Verment'},
    ]

    

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
            const rgx =new RegExp(filterVar);
            const tmp = clientContext.data.bills ? clientContext.data.bills.filter((bill) => ("" + bill[filterBy]).match(rgx)).map((bill) => {  
                const test = createData(bill.uuid, bill.status, bill['Nb.colis'], bill.amount, bill.dateCreation, bill.datePayment);
                return test
            }) : [];
            setDataValues(tmp);
        }
        else {
            const tmp = clientContext.data.bills ? clientContext.data.bills.map((bill) => {  
                const test = createData(bill.uuid, bill.status, bill['Nb.colis'], bill.amount, bill.dateCreation, bill.datePayment);
                return test
            }) : [];
            setDataValues(tmp);
        }
    }

    useEffect(() => {
        document.title= "Factures | Odelivery";
        filterButtonHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientContext.data.products]);

    const classes = useStyles();
    return (
        <> 
            <Grid item xs={12}>
                <div style={{float: 'left'}}>
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Factures
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
                        <Tables header={dataHeader} rows={dataValues} />
                    </Paper>
            </Grid>
        </>
    );
};

export default  withRouter(Bills);