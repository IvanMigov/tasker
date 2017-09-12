import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ToDoFilters extends Component {

  render() {
    return (
    <div className="td-filters">
      <div className="btn-group">
        <span>Quick Filters:</span>
        <button type="button" className="td-btn-filter active">To Do</button>
        <button type="button" className="td-btn-filter">In Progress</button>
        <button type="button" className="td-btn-filter">Closed</button>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { todo: state.todo };
}

export default connect(mapStateToProps, actions)(ToDoFilters);
