/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import TicketDetails from "./TicketDetails";
import Popup from "reactjs-popup";
// import TicketPDF from './TicketPDF';
import Pdf from "react-to-pdf";
import SingleTicket from './SingleTicket'
import { withRouter } from 'react-router-dom';

const ref = React.createRef();


const RowTicket = (props) => {


    const [showTickets, setShowTickets] = useState(false)

    console.log(props);
    return (
        <React.Fragment>
        <tr>
                <td>{props.uuid}</td>
                <td>{props.status}</td>
                <td>
                    <Popup trigger={
                        <button className="btn text-success">
                            <i className="fas fa-eye" />
                        </button>
                    }modal
                    closeOnDocumentClick>
                        <TicketDetails {...props}/>
                    </Popup>
                    {/*<Popup trigger={
                        <button className="btn text-danger">
                            <i class="far fa-file-pdf"></i>
                        </button>
                    }modal
                    closeOnDocumentClick>
                        <TicketPDF {...props}/>
                </Popup>*/}
                    <button className="btn text-danger" onClick={()=>props.history.push('/client/tickets/pdf?id='+props.uuid)} >
                            <i className="far fa-file-pdf"></i>
                    </button>
                    <button className="btn text-danger">
                        <i className="fas fa-trash-alt"/>
                    </button>
                </td>
                
            </tr>
            {/*showTickets ?
            <div className="test">
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => 
                    <div ref={ref} onClick={toPdf}>
                       { /*<button style={{margin: 20, textAlign: 'center', marginLeft: '30%'}} className="btn btn-outline-primary" onClick={toPdf}>Generate Pdf</button>}
                            <div className="TicketMain">
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                                <SingleTicket />
                            </div> 
                    </div >
                    }
                </Pdf> 
                </div>: null*/}
            </React.Fragment>
    );
};

export default withRouter(RowTicket);