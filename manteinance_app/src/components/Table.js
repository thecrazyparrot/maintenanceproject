import React from 'react';
import  Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default () => (
 
  <Table>
   <TableHead>
   <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
   </TableHead>
   <TableBody>
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>John Smith</TableCell>
        <TableCell>Employed</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2</TableCell>
        <TableCell>Randal White</TableCell>
        <TableCell>Unemployed</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>3</TableCell>
        <TableCell>Stephanie Sanders</TableCell>
        <TableCell>Employed</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>4</TableCell>
        <TableCell>Steve Brown</TableCell>
        <TableCell>Employed</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>5</TableCell>
        <TableCell>Christopher Nolan</TableCell>
        <TableCell>Unemployed</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);