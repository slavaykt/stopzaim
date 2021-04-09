import { TableContainer } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoSizer, Column, Table } from 'react-virtualized';
import useKeypress from '../../hooks/keyPress.hook';
import { useWindowSize } from '../../hooks/window.size.hook';
import { changeData, setActiveRow } from '../../redux/actions/actions';
import { TabContext } from '../context';

const useStyles = makeStyles((theme) => ({
  container: {
    height: props => props.indexTableSize.height,
  },
  headerColumn: {
  },
  grid: {
    '&:focus ': {
      outline: 'none'
    },
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottom: '1px solid rgb(224, 224, 224)',
    '&:focus ': {
      outline: 'none'
    },
  },
  activeRow: {
    backgroundColor: '#d9e1ff!important;',
    borderBottom: '1px solid rgb(224, 224, 224)',
    '&:focus ': {
      outline: 'none'
    },
  },
}));

function VirtualIndexTable({ doubleClickHandler, columns }) {
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const { data } = useSelector(state => state.app.getTab(tabId));
  const { indexTableSize } = useWindowSize();
  const classes = useStyles({ indexTableSize });
  const sortedData = data.sort((prev, next) => {
    const prevDate = new Date(prev.Дата).getTime();
    const nextDate = new Date(next.Дата).getTime();
    return prevDate - nextDate;
  });


  const ctrlDown = useKeypress('Control');

  const handleClick = ({ index }) => {
    if (ctrlDown) {
      dispatch(setActiveRow(tabId, index, false))
    } else {
      dispatch(setActiveRow(tabId, index, true))
    }
  }

  const getRowClassName = ({ index }) => {
    if (sortedData[index]) {
      return sortedData[index].isActive ? classes.activeRow : classes.row;
    }
  }

  const cellRenderer = ({ cellData, columnIndex }) => {
    const { handler } = columns[columnIndex];
    if (handler) {
      return handler(cellData);
    };
    return cellData;
  }

  const cellDataGetter = ({ dataKey, rowData }) => {
    return _.get(rowData, dataKey);
  }

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={53}
            headerClassName={classes.headerColumn}
            rowClassName={getRowClassName}
            gridClassName={classes.grid}
            rowHeight={53}
            rowCount={sortedData.length}
            rowGetter={({ index }) => sortedData[index]}
            onRowClick={handleClick}
            onRowDoubleClick={doubleClickHandler}>
            {columns.map(({ label, dataKey, width }) =>
              <Column
                key={dataKey}
                label={label}
                dataKey={dataKey}
                width={width}
                cellDataGetter={cellDataGetter}
                cellRenderer={cellRenderer} />
            )}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
}

export default VirtualIndexTable;