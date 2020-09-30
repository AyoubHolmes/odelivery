import React, {useState, useEffect, useContext} from 'react';
import clientContext from '../../../context/client-context';
import { PDFViewer, Page, Text, View, Document } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';


const Heading = styled.Text`
  margin-top: 10px;
  margin-left: 10px;
  margin-right:10px
  padding: 10px;  
  border: 1px solid black;
  width: 50%;
  display: block;
  background-color: blue;
`;

const SubHeading = styled.Text`
    margin-left: 10px;
    margin-right:10px
    padding: 10px;  
    border: 1px solid black;
    width: 50%;
    display: block;
    font-size: 10px;
`;

const FinalSubHeading = styled.Text`
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right:10px
    padding: 10px;  
    border: 1px solid black;
    width: 50%;
    display: block;
    font-size: 8px;
`;

const Title = styled.Text `
    font-size: 20px;
    font-weight: 900;
    color: white;
    margin: 5px;
    padding: 5px;
    font-family: 'Helvetica';
    text-align: center;
`;

const TicketPDF = (props) => {

    const [shipments, setShipments] = useState([]);
    const ClientContext = useContext(clientContext);
    useEffect(()=>{
        const ships = []
        console.log(ClientContext.data.data);
        ClientContext.data.shipments.forEach((shipment) => {
            if(props.shipments.includes(shipment.id)){
                ships.push(shipment)
            }
        });
        setShipments([...ships])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PDFViewer style={{width: '100%', height: '500px'}}>
            <Document style={{width: '100%', padding: 20}}>
                <Page size="A4" style={{ backgroundColor: 'white' }}>
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
    );
};
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