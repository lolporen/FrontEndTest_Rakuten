import React, { Component } from "react";
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import FormStore from '../../store/FormStore.js';
import FormModal from './FormModal.jsx';

let formStore = new FormStore();

class TableContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      order: 'asc',
      orderBy: 'name'
    };
  }
  render() {
    let rows = formStore.getRows();
    
    const columns = [{label: 'No.', value: 'id'}, {label: 'Name', value: 'name'}, {label: 'Phone', value: 'phone'}, {label: 'Email', value: 'email'}, {label: 'Action', value: 'action'}];
    const { order, orderBy} = this.state;
    return (
      <div className='table-container'>
        <Paper className={'root'}>
          <Table className={'table'}>
            <TableHead>
              <TableRow>
                {columns.map((column, index)=> {
                  return (
                    <TableCell key={index} align="center">
                      <Tooltip
                        title="Sort"
                        placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === column.value}
                          direction={order}
                          onClick={this.createSortHandler(column.value)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy)).map(row => (
                <TableRow key={row.id}>
                  <TableCell scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <div className='action-button-list'>
                      <div className={'action-button Delete'} onClick={this._delete.bind(this, row)}>{'Delete'}</div>
                      <div className={'action-button Modify'} onClick={this._modify.bind(this, row)}>{'Modify'}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div className={'action-button Add'} onClick={this._add.bind(this)}>{'+'}</div>
        <FormModal ref={'formModal'} parent={this} users={formStore.getUsers()}/>
      </div>
    );
  }
  handleSave(){
    this.handleClose();
  }
  handleClose(){
    this.refs.formModal.handleClose();
  }
  handleClickOpen(type, row, formStore){
    this.refs.formModal.handleClickOpen(type, row, formStore);
  }
  createSortHandler(property){
    return (event) => {
      this.handleRequestSort(event, property);
    }
  }
  handleRequestSort(event, property){
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }
  _delete(row){
    formStore.delete(row);
    this.setState({});
  }
  _modify(row){
    this.handleClickOpen('modify', row, formStore);
  }
  _add(){
    let newRow = formStore.getAddObject();
    this.handleClickOpen('add', newRow, formStore);
  }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export default TableContainer;

const container = document.getElementById("container");
container ? ReactDOM.render(<TableContainer />, container) : false;