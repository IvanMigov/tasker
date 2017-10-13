import React, { Component } from 'react';
import logoNormal from '../images/status/normal.png';
import logoHigh from '../images/status/major.svg';
import logoLow from '../images/status/minor.svg';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import {MOVE_TODO_IN_LIST} from '../actions/types';


const todoSource = {
  beginDrag(props) {
    props.triggerDragging();
    return {
      id: props.id,
      index: props.index,
    };
  },
  endDrag(props) {
    props.triggerDragging()
  },
};

const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveTodo(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
    const dragID = monitor.getItem().id;
    const hoverID = props.id;

    props.pinTodo(dragID, hoverID);
  }
};

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
  getClassName(){
    let className = 'td-issue-long';
    if(this.props.isDragging){
      className = 'td-issue-long td-is-dragging';
    }
    return className;
  }

  render() {
    const {id,date,label,title,status,priority} = this.props.todo;
    const {connectDragSource,connectDropTarget} = this.props;
    return  connectDragSource(connectDropTarget(
      <div className={this.getClassName()} onClick={this.fireClick.bind(this)}>
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
      </div>
    ));
}
}
export default DragSource(MOVE_TODO_IN_LIST, todoSource, collectSource)
(DropTarget(MOVE_TODO_IN_LIST, todoTarget, collectTarget)(TodoItemLong));