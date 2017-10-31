import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import TodoItemColumn   from './todo_item_column';
import {Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class StatusColumn extends Component {
  getClassName() {
    return `td-column td-${this.props.column.value}`;
  }
  getTodoView(todo,i) {
    return (
      <Draggable key={todo.id} draggableId={todo.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getItemStyle(
              provided.draggableStyle,
              snapshot.isDragging
            )}
            {...provided.dragHandleProps}
          >
            <TodoItemColumn
              index = {i}
              todo = {todo}
            />
            {provided.placeholder}
          </div>
        )}
      </Draggable>
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