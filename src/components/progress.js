import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import StatusColumn   from './status_column';


const progressStatus = [
  {
    value: 'ToDo',
    label: 'ToDo'
  },
  {
    value: 'InProgress',
    label: 'In Progress'
  },
  {
    value: 'Done',
    label: 'Done'
  },

];

class Progress extends Component {
  getColumnView(column){
    return (
      <StatusColumn
        key={column.value}
        column = {column}
      />
    );
  }
  render() {
    return (
      <div className="td-progress" >
        {
          progressStatus.map(this.getColumnView.bind(this))
        }
      </div>
    );
  }
}

Progress = connect(
  null,
  actions
)(Progress);

export default Progress