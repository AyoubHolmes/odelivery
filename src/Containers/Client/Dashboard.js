/* eslint-disable no-unused-vars */
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BarChart from '../../Components/Charts/BarCharts';
import PiChart from '../../Components/Charts/Piechart';
import Deposits from '../../Components/ClientBoard/Deposits';
import Tables from '../../Components/Tables/Tables';
import { makeStyles } from '@material-ui/core/styles';
import ClientContext from '../../context/client-context';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 400,
      },
      fixedHeight2: {
        height: 140,
      },
}))

  
const createData = (id, date, name, shipTo, paymentMethod, amount) => {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  
const Dashboard = () => {

  // ------------------------------- Statistics -------------------
  const clientContext = useContext(ClientContext);
  const data = clientContext.data;
  const [revenue, setRevenue] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [lengthShipments, setLengthShipments] = useState(0);
  const [sentMoney, setSentMoney] = useState(0);
  // -------------- chartbar -----------------
  const [tickValues, setTickValues] = useState([]);
  const [dataProdcutSales, setDataProdcutSales] = useState([]);
  // -----------------------------------------
  const [citiesStatistics, setCitiesStatistics] = useState([]);
  const [statusStatistics, setStatusStatistics] = useState([])

  const revenueHandler = (data) => {
      const shippedStatus = data.shipments.filter(colis => colis.status ==='Billed' || colis.status ==='Delivered');
      let r = 0;
      for(let i = 0; i < shippedStatus.length; i++){
          r += shippedStatus[i].price;
      }
      return (r);
  };

  const shippedHandler = (data) => {
      const shippedStatus = data.filter(colis => colis.status ==='Billed' || colis.status ==='Delivered');
      return shippedStatus.length;
  };

  const inProgressHandler = (data) => {   
      const inProgressStatus = data.filter(colis => colis.status ==='In Progress');
      return inProgressStatus.length
  }

  const sentMoneyHandler = (data) => {
      let amount = 0;
      data.bills.forEach(bill => {
          amount += +bill.amount;
      });

      return(amount);
  }

  const lengthShipmentsHandler = (data) => data.bills.length;

  const tickValuesHandler = (data) => Array.from(Array(data.products.length).keys(), x => x + 1)

  const dataProdcutSalesHandler = (data) => {
      const productsSales = data.products.map((product, index) => {
          const shipmentsByProduct = data.shipments.filter(shipment => (shipment.status ==='Billed' 
              || shipment.status ==='Delivered') && shipment.productID === index);
              let r = 0;
              for(let i = 0; i < shipmentsByProduct.length; i++){
                  r += shipmentsByProduct[i].price;
              }
          return {quarter: index + 1, earnings: r}
      })
      return productsSales
  }

  const citiesStatisticsHandler = data => {
      const cities = ["Casablanca", "Mohammedia", "Rabat", "Agadir", "Marrakech"];
      const statistics = cities.map((city) => data.shipments.reduce((a, v)=> (v.city === city ? a + 1 : a), 0))
      const totalLength = data.shipments.length;
      let tmp = cities.map((city, index) => {
          return { x: city, y: statistics[index] / totalLength * 100}
      })
      tmp = tmp.filter(t => t.y !== 0);
      return (tmp);
  }

  const statusStatisticsHandler = (data) => {
     const statisticsPreparing = data.shipments.reduce((a, v)=> (v.status === "Preparing" ? a + 1 : a), 0);
     const statisticsWaiting = data.shipments.reduce((a, v)=> (v.status === "Waiting For Pickup" ? a + 1 : a), 0);
     const statisticsIn = data.shipments.reduce((a, v)=> (v.status === "In Progress" ? a + 1 : a), 0);
     const statisticsDelivered = data.shipments.reduce((a, v)=> (v.status === "Delivered" ? a + 1 : a), 0);        
     const statisticsBilled = data.shipments.reduce((a, v)=> (v.status === "Billed" ? a + 1 : a), 0);
     const statisticsCanceled = data.shipments.reduce((a, v)=> (v.status === "Canceled" ? a + 1 : a), 0);
     const statisticsNo= data.shipments.reduce((a, v)=> (v.status === "No Answer" ? a + 1 : a), 0);
     const totalLength = data.shipments.length;
     let tmp = [
      {x: "Preparing", y: statisticsPreparing / totalLength * 100},
      {x: "Waiting For Pickup", y: statisticsWaiting / totalLength * 100},
      {x: "In Progress", y: statisticsIn / totalLength * 100},
      {x: "Delivered", y: statisticsDelivered / totalLength * 100},
      {x: "Billed", y: statisticsBilled / totalLength * 100},
      {x: "Canceled", y: statisticsCanceled / totalLength * 100},
      {x: "No Answer", y: statisticsNo / totalLength * 100}
     ];
     tmp = tmp.filter(t => t.y !== 0);
     return tmp;
  }

  useEffect (()=>{
      document.title= "Home | Odelivery";
      console.log(clientContext);
      if (data.shipments !== undefined && data.products !== undefined)
      {
          setRevenue(revenueHandler(data));
          setShipped(shippedHandler(data.shipments));
          setInProgress(inProgressHandler(data.shipments));
          setSentMoney(sentMoneyHandler(data));
          setLengthShipments(lengthShipmentsHandler(data));
          setTickValues(tickValuesHandler(data));
          setDataProdcutSales(dataProdcutSalesHandler(data));
          setCitiesStatistics(citiesStatisticsHandler(data));
          setStatusStatistics(statusStatisticsHandler(data))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientContext]);
  // --------------------------------------------------------------

    const dataHeader = ['id', 'Date', 'Name', 'Ship To', 'Payment Method', 'Sale Amount'];
    const dataValues = [
      createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
      createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
      createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
      createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
      createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
    ];
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightDeposits = clsx(classes.paper, classes.fixedHeight2);
    return clientContext.data ? (
        <>
          <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightDeposits}>
                  <Deposits title="Total chiffre d'affaires" value={0} />
              </Paper>
          </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightDeposits}>
                  <Deposits title="Colis livrés facturés" value={0} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
                <Paper className={fixedHeightDeposits}>
                    <Deposits title="Colis livrés non facturés" value={0} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightDeposits}>
                    <Deposits title="Total" value={0} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightDeposits}>
                    <Deposits title="En cours" value={0} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightDeposits}>
                    <Deposits title="Livrés" value={0} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightDeposits}>
                    <Deposits title="Echouiés" value={0} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={2} lg={6}>
                <Paper className={fixedHeightPaper}>
                    <PiChart />
                </Paper>
            </Grid>
            <Grid item xs={12} md={2} lg={6}>
                <Paper className={fixedHeightPaper}>
                    <PiChart />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <BarChart />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Tables title="Les derniers factures" header={dataHeader} rows={dataValues}/>
                </Paper>
            </Grid>
          </>
    ) : <div id="loader"><CircularProgress /></div>
};

export default Dashboard;


/*

            */