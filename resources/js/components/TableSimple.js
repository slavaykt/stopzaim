import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TableSimple({ columns, rows }) {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map((column,i) =>
            <StyledTableCell key={i}>{column.label}</StyledTableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <StyledTableRow key={i}>
            {columns.map((column,i) =>
              <StyledTableCell key={i}>{row[column.key]}</StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableSimple;