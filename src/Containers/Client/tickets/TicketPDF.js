import React, {useState, useEffect, useContext} from 'react';
import clientContext from '../../../context/client-context';
import SingleTicket from './SingleTicket';

const TicketPDF = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [shipments, setShipments] = useState([]);
    const ClientContext = useContext(clientContext);
    useEffect(()=>{
        const ships = []
        console.log(props);
        ClientContext.data.shipments.forEach((shipment) => {
            if(props.shipments.includes(shipment.id)){
                ships.push(shipment)
            }
        });
        setShipments([...ships])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {shipments.map((shipment, index) => <SingleTicket key={index} {...shipment}/>)}
        </>
    );
};

/*
<PDFViewer style={{ width: '100%', height: '100%' }}>
        <Document>
          <Page>
            <Text>TEST</Text>
          </Page>
        </Document>
      </PDFViewer>

<PDFViewer style={{width: '100%', height: '500px'}}>
            <Document style={{width: '100%', padding: 20}}>
                <Page size="A4" style={{ backgroundColor: 'white' }}>
                    <Heading>
                        <Title>Odelivery</Title>
                    </Heading>
                    {shipments ? Object.values(shipments).map((shipment, index)=> {
                        return (
                            <>
                            <Heading>
                                <Title>Odelivery</Title>
                            </Heading>
                            <SubHeading>
                                name: {shipment.name}
                            </SubHeading>
                            <SubHeading>
                                address: {shipment.adress}
                            </SubHeading>
                            <SubHeading>
                                phone number: {shipment.phoneNumber}
                            </SubHeading>
                            <SubHeading>
                                product: {shipment.productTitle}
                            </SubHeading>
                            <SubHeading>
                                price: {shipment.price}
                            </SubHeading>
                            <FinalSubHeading>
                                PHONE OF USER: {ClientContext.data.data.phoneNumber}
                            </FinalSubHeading>
                            </>
                        )
                    }) : null}
                </Page>
            </Document>
        </PDFViewer>
*/

/*
 <Heading>
                        <Title>Odelivery</Title>
                    </Heading>
                    <SubHeading>
                        
                    </SubHeading>

<Page size="A4" style={{ backgroundColor: 'white' }}>
                    <View style={{ color: 'black', border: '5px solid black', width: '100%', margin: '10px', padding: '10px' }}>
                        <Text style={{fontSize: '30px'}}>Odelivery</Text>
                        <Text style={{fontSize: '10px'}}>UUID</Text>                    
                    </View>
                    <View style={{ color: 'black', border: '5px solid black', width: '100%', padding: '10px' }}>
                        <Text style={{fontSize: '30px'}}>Odelivery</Text>
                        <Text style={{fontSize: '10px'}}>UUID</Text>                    
                    </View>
                </Page>
*/
export default TicketPDF;