import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ReactToPdf from 'react-to-pdf';
import TicketPDF from './TicketPDF';
import './Ticket.css';

const ref = React.createRef();

const TicketPopUp = (props) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog maxWidth="md" fullWidth={true} fullScreen={fullScreen} open={props.openTicket} onClose={props.handleCloseTicket} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                        {({toPdf}) => (
                            <button onClick={toPdf}>Generate pdf</button>
                        )}
                    </ReactToPdf>
                </DialogTitle>
                <DialogContent>
                    <div className="TicketMain" ref={ref}>
                        <TicketPDF shipments={props.ticket.shipments}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TicketPopUp;