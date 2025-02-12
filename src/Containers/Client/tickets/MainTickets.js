import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ClientContext from '../../../context/client-context';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tables from '../../../Components/Tables/Tables';
import Typography from '@material-ui/core/Typography';
import InputTest from '../../../Components/Inputs/BootstrapInput'
import TicketPopUp from './TicketPopUp';

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

const createData = (uuid, status) => {
    return { uuid, status};
  }


const Tickets = (props) => {

    const clientContext = useContext(ClientContext);

    const dataHeader = ['UUID', 'Statut'];
    const [dataValues, setDataValues] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterVar, setFilterVar] = useState("");
    const [openTicket, setOpenTicket] = useState(false);
    const [ticket, setTicket] = useState({});

    const conditions = [
        {value: 'uuid', label: 'UUID'},
        {value: 'status', label: 'Statut'},
    ]


    const handleCloseTicket = () => {
        setOpenTicket(false);
    }

    const openTicketHandler = (uuid) => {
        const tmp  = clientContext.data.tickets.find(t => t.uuid === uuid);
        console.log(tmp);
        setTicket(tmp);
        setOpenTicket(true);
    }

    const filterByHandler = (filter) => {
        setFilterBy(filter.target.value);
    }
    const filterVarHandler = (filter) => {
        setFilterVar(filter.target.value);
    }

    const filterButtonHandler = () => {
        console.log(clientContext.data.tickets);
        if (filterBy !== "") {
            const rgx =new RegExp(filterVar);
            const tmp = clientContext.data.tickets ? clientContext.data.tickets.filter((ticket) => ("" + ticket[filterBy]).match(rgx)).map((ticket) => {  
                const test = createData(ticket.uuid, ticket.status);
                return test
            }) : [];
            setDataValues(tmp);
        }
        else {
            const tmp = clientContext.data.tickets ? clientContext.data.tickets.map((ticket) => {  
                const test = createData(ticket.uuid, ticket.status);
                return test
            }) : [];
            setDataValues(tmp);
        }
    }

    useEffect(() => {
        document.title= "Tickets | Odelivery";
        filterButtonHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientContext.data.tickets]);

    const classes = useStyles();
    return (
        <> 
            <Grid item xs={12}>
                <div style={{float: 'left'}}>
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Tickets
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
                        <Tables header={dataHeader} rows={dataValues} actions={true} ticketRowActions={true} openTicketHandler={openTicketHandler}/>
                    </Paper>
            </Grid>
            <TicketPopUp handleCloseTicket={handleCloseTicket} openTicket={openTicket} ticket={ticket}/>
        </>
    );
};

export default  withRouter(Tickets);