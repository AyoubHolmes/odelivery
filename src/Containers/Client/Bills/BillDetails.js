import React from 'react';

const BillDetails = (props) => {

    return (
        <div style={{width: '100%', padding: 20}}>
        <h2 style={{float: 'left', padding: 30}}>Invoice: <b>{props.uuid}</b></h2>
        <p style={{float: 'left', padding: 30, display: 'inline'}}>Nb.colis: {props['Nb.colis']}</p>
        <p style={{float: 'left', padding: 30, display: 'inline'}}>Amount: {props.amount}MAD</p>
        <p style={{float: 'left', padding: 30, display: 'inline'}}>Date of creation: {props.dateCreation}</p>
        <p style={{float: 'left', padding: 30, display: 'inline'}}>Date of payment: {props.datePayment ? props.datePayment : ""}</p>
    </div>
    );
};

export default BillDetails;