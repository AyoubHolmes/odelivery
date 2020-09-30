import React from 'react';
//import Link from '@material-ui/core/Link';
//import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';


export default function Deposits(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h5">
        MAD3,024.00
      </Typography>
      <Typography color="textSecondary" style={{flex: 1}}>
        by %
      </Typography>
      
    </React.Fragment>
  );
}
