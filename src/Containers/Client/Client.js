import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientBoard from '../../Components/ClientBoard/ClientBoard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Route, Redirect, Switch } from 'react-router-dom'
import asyncComponent from '../../hoc/asyncComponent';
import ClientContext from '../../context/client-context';
import firebase from '../../firebase';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



const Dashboard = asyncComponent(() => {
    return import('./Dashboard')
})

const ProductsAll = asyncComponent(() => {
    return import('./Products/All');
})  

const ShipmentsAll = asyncComponent(() => {
    return import('./Shipments/All');
})  



const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          Odelivery
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

const Client = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({});
    const fetchData = () => {
        return firebase.getCurrentUserData().then(res => {
                setData({...res});
                console.log(res);
            }).catch(err => {
            console.log(err);
        }); 
    }

    useEffect(() => {
        if (firebase.getCurrentUsername())
            fetchData();
        else {
            alert('Please login first')
            props.history.replace('/login')
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.root}>
            <ClientContext.Provider 
                value={{
                    data: data,
                    fetchData: fetchData
                }}
            >
                <ClientBoard />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Switch>
                                <Route path={props.match.url + '/dashboard'} exact component={Dashboard} />
                                <Route path={props.match.url + '/products'} exact component={ProductsAll} />
                                <Route path={props.match.url + '/shipments'} exact component={ShipmentsAll} />
                                <Redirect from={props.match.url+ '/'} exact to={props.match.url + '/dashboard'} />
                            </Switch>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </ClientContext.Provider>
        </div>
    );
};

export default Client;