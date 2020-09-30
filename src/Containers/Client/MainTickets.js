/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import Content from '../../Components/Content/Content';
import ClientContext from '../../context/client-context';
import Pdf from "react-to-pdf";
import SingleTicket from './tickets/SingleTicket';
import './Client.css'

const ref = React.createRef();

const MainTickets = (props) => {

    const clientContext = useContext(ClientContext);
    // const [uuid, setUuid] = useState("");
    const [shipments, setShipments] = useState([]);
    useEffect(() => {
        let component = "";
        const query = new URLSearchParams(props.location.search);
        for (let param of query.entries()) {
            if(param[0] === 'id') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                component= param[1];
            }
        }
        const ticket = clientContext.data.tickets.find(t => t.uuid === component);
        const shipmentsList = clientContext.data.shipments.filter(s => ticket.shipments.includes(s.id));
        console.log(shipmentsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.location.search]);
    
    
    return (
        <Content>
            <div className="test">
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => 
                    <>
                       <button href='test' id="test" style={{margin: 20, textAlign: 'center', marginLeft: '30%'}} className="btn btn-outline-danger" onClick={toPdf}>
                           <i className="far fa-file-pdf"></i> Generate Pdf
                        </button>
                            <div ref={ref} className="TicketMain">
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                            </div> 
                    </>
                    }
                </Pdf> 
                </div>
        </Content>
    );
};

export default MainTickets;