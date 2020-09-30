import React, { useContext, useState, useEffect } from 'react';
import clientContext from '../../../context/client-context';
import Content from '../../../Components/Content/Content';
import RowBills from './RowBills'
import './MainBills.css'

const MainBills = () => {
    const ClientContext = useContext(clientContext);
    const [bills, setBills] = useState([]);
    useEffect(()=> {
        document.title = "Invoices | Odelivery";
        setBills(ClientContext.data.bills);
        //console.log(ClientContext.data.bills);
    },[ClientContext.data.bills])
    return (
        <React.Fragment>
            <div className="headerAllInvoices">
                <ul>    
                    <li><h1>Invoices</h1></li>
                </ul>
            </div>
            <Content>
                <table className="table" style={{width: '90%', textAlign: 'center'}}>
                            <thead className="thead-dark">
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
                                {
                                    bills ? Object.values(bills).map((bill, index) => {
                                        return (
                                            <RowBills key={index} {...bill}/>
                                        )
                                    }) : null
                                }
                            </tbody>
                    </table>            
            </Content>
        </React.Fragment>
    );
};

export default MainBills;