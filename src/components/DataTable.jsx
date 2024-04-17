import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function DataTable({dataList, variableExpressions}) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="test data table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>No.</TableCell>
            {
                variableExpressions.map((variableExpression, index) => <TableCell align='center' key={index}>{variableExpression}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
            {
                dataList.map((data, index) => <TableRow key={index}>
                    <TableCell align='center'>{index + 1}</TableCell>
                    {
                        variableExpressions.map((variableExpression, index) => <TableCell align='center' key={index}>{data[variableExpression]}</TableCell>)
                    }
                </TableRow>)
            }
          
        </TableBody>
      </Table>
    </TableContainer>
  )
}
