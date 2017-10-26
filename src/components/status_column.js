import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import TodoItemColumn   from './todo_item_column';



class StatusColumn extends Component {
  getClassName() {
    return `td-column td-${this.props.column.value}`;
  }
  getTodoView(todo,i) {
    return (
      <TodoItemColumn
        key={todo.id}
        index = {i}
        todo = {todo}
      />
    );
  }

  render() {
    return (
      <div className={this.getClassName()} >
        <div className="td-column-label">
            {this.props.column.label}
        </div>
        <div className="td-column-list">
          {
            this.props.todos.map(this.getTodoView.bind(this))
          }
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