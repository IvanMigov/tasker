import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';



class StatusColumn extends Component {
  getClassName() {
    return `td-column td-${this.props.column.value}`;
  }

  render() {
    return (
      <div className={this.getClassName()} >
        <div className="td-column-label">
            {this.props.column.label}
        </div>
        <div className="td-column-list">

        </div>
      </div>
    );
  }
}

StatusColumn = connect(
  null,
  actions
)(StatusColumn);

export default StatusColumn