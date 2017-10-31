import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import TodoItemColumn   from './todo_item_column';
import { Droppable } from 'react-beautiful-dnd';

const getListStyle = (isDraggingOver) => {

  // console.log('args',isDraggingOver);
  return {
    borderColor: isDraggingOver ? '#3b73af' : 'transparent',
    background: isDraggingOver ? '#f3f9f4' : '#fff',

    // padding: "5px"
    // width: 250,
  }
};



class StatusColumn extends Component {
  getClassName() {
    return `td-column td-${this.props.column.value}`;
  }
  getTodoView(todo,i) {
    return (
      <TodoItemColumn
        index={i}
        key={todo.id}
        todo={todo}
      />
    );
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="td-column-label">
          {this.props.column.label}
        </div>
        <Droppable droppableId={this.props.column.value} key={this.props.column.value}>
          {(provided, snapshot) => (
            <div
              className="td-column-list"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {
                this.props.todos.map(this.getTodoView.bind(this))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

StatusColumn = connect(
  null,
  actions
)(StatusColumn);

export default StatusColumn