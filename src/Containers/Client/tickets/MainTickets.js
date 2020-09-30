import React, { useEffect, useState, useContext } from 'react';
import Content from '../../../Components/Content/Content';
import { withRouter } from 'react-router-dom';
import RowTicket from "./RowTicket";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clientContext from '../../../context/client-context'

import './Ticket.css';


const MainTickets = (props) => {

   const [tickets, setTickets] = useState({});
   const ClientContext = useContext(clientContext);
   useEffect(() => {
       document.title = "Tickets | Odelivery"
       if (ClientContext.data.tickets)
        setTickets([...ClientContext.data.tickets]);
   }, [ClientContext.data.tickets]);

    return (
        <React.Fragment>
            <div className="headerAll">
                <ul>    
                    <li><h1>Tickets</h1></li>
                </ul>
            </div>
            <Content>
                <table className="table" style={{width: '90%', textAlign: 'center'}}>
                            <thead style={{backgroundColor: 'blue', color: "white"}}>
                                <tr>
                                    <th colSpan="3">TEST</th>
                                </tr>
                            </thead>
                            <thead className="thead-light">
                                <tr>
                                    <th>UUID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets ? Object.values(tickets).map((ticket, index) => (
                                    <RowTicket key={index} {...ticket}/>                           
                                    )) : null}
                            </tbody>
                    </table>            
            </Content>
        </React.Fragment>
    );
};

export default withRouter(MainTickets);

/*
<div className="headerAll">
                <ul>    
                    <li><h1>Tickets</h1></li>
                    <li style={{marginBottom: '30px'}}>
                        <button
                            onClick={()=>props.history.push('/client/tickets/add')}
                            type="button"
                            className="btn btn-outline-danger">
                        <FontAwesomeIcon icon="plus"/> Add New Tickets
                        </button>
                    </li>
                </ul>
            </div>
*/