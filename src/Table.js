import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import data from './data';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});





export default function DataTable({ data }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} >
                <TableHead>
                    <TableRow>

                        <TableCell>Currency</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">Bid</TableCell>
                        <TableCell align="right">Ask</TableCell>
                        <TableCell align="right">High</TableCell>
                        <TableCell align="right">Low</TableCell>
                        <TableCell align="right">Open</TableCell>
                        <TableCell align="right">Close</TableCell>
                        <TableCell align="right">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.currency}
                            </TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell align="right">{row.bid}</TableCell>
                            <TableCell align="right">{row.ask}</TableCell>
                            <TableCell align="right">{row.high}</TableCell>
                            <TableCell align="right">{row.low}</TableCell>
                            <TableCell align="right">{row.open}</TableCell>
                            <TableCell align="right">{row.close}</TableCell>
                            <TableCell align="right">{row.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


