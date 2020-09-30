import React from 'react';
import './Ticket.css';

const SingleTicket = () => {
    return (
        <div className= "ticket">
            <div className="ticket-head">Odelivery</div>
            <hr />
            <div className="ticket-body">
                <div className="ticket-element">Name: TEST1</div>
                <div className="ticket-element">Name: TEST2</div>
                <div className="ticket-element">Name: TEST3</div>
                <div className="ticket-element">Name: TEST4</div>
                <div className="ticket-element">Name: TEST5</div>
            </div>
        </div>
    );
};

export default SingleTicket;