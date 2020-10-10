import React, { useEffect } from 'react';
import firebase from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import './Main.css'


const Main = (props) => {

    
    useEffect(() => {
      document.title = 'redirect...';
      if (firebase.getCurrentUsername()) {
        console.log("TEST1");        
        firebase.getCurrentUserData().then(res => {
          if (res.data.client)
            props.history.replace('/client');
          if (res.data.livreur)
            props.history.replace('/livreur');
          if (res.data.admin)
            props.history.replace('/admin')
          }).catch(err => {
            firebase.logout();
            props.history.replace('/login')   
          }); 
      }
      else {
        props.history.replace('/login')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return (
      <>
        <div id="loader2"><CircularProgress /></div>
      </>
    );
};

export default Main;