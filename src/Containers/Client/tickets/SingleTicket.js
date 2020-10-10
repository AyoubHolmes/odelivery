import React, { useContext } from 'react';
import ClientContext from '../../../context/client-context';
import './Ticket.css';

const SingleTicket = (props) => {
    const clientContext = useContext(ClientContext);
    return (
        <div className= "ticket">
            <div className="ticket-head">Odelivery</div>
            <hr />
            <div className="ticket-body">
                <div className="ticket-element">Nom: {props.name}</div>
                <div className="ticket-element">adresse: {props.adress}</div>
                <div className="ticket-element">Telephone: {props.phoneNumber}</div>
                <div className="ticket-element">Produit: {props.productTitle}</div>
                <div className="ticket-element">Quantité: {props.quantity}</div>
                <div className="ticket-element">Prix: {props.price}</div>
            </div>
            <hr />
            <div className="ticket-footer">
                telephone d'urgence: {clientContext.data.data.phoneNumber}
            </div>
        </div>
    );
};

export default SingleTicket;