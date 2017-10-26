import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';

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
  render() {
    return (
      <div className="td-progress" >
        <h1>progress</h1>

      </div>
    );
  }
}

Progress = connect(
  null,
  actions
)(Progress);

export default Progress