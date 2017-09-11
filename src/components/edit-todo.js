import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EditToDo extends Component {

  render() {
    return (
      <div className="edit-todo">
        {this.props.todo ? this.props.todo.id : 'NULL' }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todo: state.todo };
}

export default connect(mapStateToProps, actions)(EditToDo);
