import React, { Component } from 'react';
import logoNormal from '../images/status/normal.png';
import logoHigh from '../images/status/major.svg';
import logoLow from '../images/status/minor.svg';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import {MOVE_TODO_IN_LIST} from '../actions/types';


const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().id;
    const hoverIndex = props.id;

    // // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTodo(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    props.pinTodo(dragIndex, hoverIndex);

  }
};

// @DropTarget(MOVE_TODO_IN_LIST, todoTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
// @DragSource(MOVE_TODO_IN_LIST, todoSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
// }))

class TodoItemLong extends Component {
  getImgPriority(priority) {
    let logoImg = logoNormal;
    switch (priority) {
      case  'low':
        logoImg = logoLow;
        break;
      case  'high':
        logoImg = logoHigh;
        break;
      default:
        logoImg = logoNormal;
    }

    return (
      <img src={logoImg} alt="priority"/>
    );
  }
  getColorStatus(status) {
    let backgroundColor = '#bfe4ff';//status == todo
    switch (status) {
      case  'InProgress':
        backgroundColor = '#0c0e75';
        break;
      case  'Closed':
        backgroundColor = '#1d750c';
        break;
      default:
        backgroundColor = '#bfe4ff';
    }

    return {backgroundColor}
  }
  fireClick(){
    this.props.fireOnClick(this.props.todo.id);
  }


  render() {
    const {id,date,label,title,status,priority} = this.props.todo;
    const {connectDragSource,connectDropTarget} = this.props;
    return  connectDragSource(connectDropTarget(
      <div className="td-issue-long" onClick={this.fireClick.bind(this)}>
        <div className="td-issue-content" >
          <div className="td-row">
            <span className="td-type" title={priority}>
              {this.getImgPriority(priority)}
            </span>
            <div className="td-key">
              <span  title={id} className="td-key-link">{id}</span>
            </div>
            <div className="td-summary" title={title}>
              <span className="td-inner">{title}</span>
            </div>

          </div>
          <div className="td-row td-row-bottom">
            <div className="td-label" title={label}>
              <span className="td-inner">{label}</span>
            </div>
            <div className="td-date" title={date}>
              <span className="td-inner">{date}</span>
            </div>
          </div>

        </div>
        <div className="td-grabber" style={this.getColorStatus(status)}></div>
      </div>,
    ));
  }
}
export default DragSource(MOVE_TODO_IN_LIST, todoSource, collectSource)
(DropTarget(MOVE_TODO_IN_LIST, todoTarget, collectTarget)(TodoItemLong));