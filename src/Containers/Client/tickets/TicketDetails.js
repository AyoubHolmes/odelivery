import React, {useState, useEffect, useContext} from 'react';
import clientContext from '../../../context/client-context';
// import Popup from "reactjs-popup";



const TicketDetails = (props) => {

    const [shipments, setShipments] = useState([]);
    const ClientContext = useContext(clientContext);


    useEffect(()=>{
        const ships = []
        ClientContext.data.shipments.forEach((shipment) => {
            if(props.shipments.includes(shipment.id)){
                console.log(shipment);
                ships.push(shipment)
            }
        });
        setShipments([...ships])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{width: '100%', padding: 20}}>
            <h2 style={{float: 'left', padding: 30}}>Ticket: <b>{props.uuid}</b></h2>
            <h2 style={{float: 'left', padding: 30}}>Status: {props.status}</h2>
            <h3 style={{float: 'left', padding: 30}}>Shippings:</h3>
            <hr></hr>
            <table className="table" style={{width: '90%', textAlign: 'center'}}>
                    <thead className="thead-light">
                            <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shipments ? Object.values(shipments).map((shipment, index)=>{
                                console.log(shipment); 
                                return (
                                 <tr key={index}>
                                     <td>{shipment.productTitle}</td>
                                     <td>{shipment.price}</td>
                                     <td>{shipment.status}</td>
                                 </tr>)
                                 }
                            ) : null
                        }
                    </tbody>
                </table>
        </div>
    );
};

/*
<th>Quantity</th>
<th>Date</th>
 <th>Address</th>
<th>City</th>
*/

export default TicketDetails;