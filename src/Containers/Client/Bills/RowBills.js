import React from 'react';
import BillDetails from './BillDetails'
import Popup from 'reactjs-popup';


const RowBills = (props) => {
    return (
        <tr>
            <td>{props.uuid}</td>
            <td>{props.paid ? "Paid" : "Unpaid"}</td>
            <td>
                <Popup trigger={
                    <button className="btn text-success">
                        <i className="fas fa-eye" />
                    </button>
                    } modal
                    closeOnDocumentClick>
                        <BillDetails {...props} />
                </Popup>
                <button className="btn text-danger">
                    <i className="fas fa-trash-alt"/>
                </button>
            </td>    
        </tr>
    );
};

export default RowBills;