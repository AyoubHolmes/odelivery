/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Content from '../../Components/Content/Content';
import ClientContext from '../../context/client-context'
import EditOrAddShipment from './Shipments/EditOrAddShipment/EditOrAddShipment';

const MainShipment = (props) => {

    const clientContext = useContext(ClientContext);    
    let component = <EditOrAddShipment />
    if(props.location.search){
        const query = new URLSearchParams(props.location.search);
        for (let param of query.entries()) {
            if(param[0] === 'id') {
                component= <EditOrAddShipment shipmentId={+param[1]} shipment={clientContext.data.shipments[+param[1]]}/>
            }
        }
    }
    return (
        <Content>
            {component}
        </Content>
    );
};

export default MainShipment;