import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import {MOVE_TODO_IN_LIST} from '../actions/types';
import Tooltip from 'react-tooltip-component';
import {getImgPriority,getColorStatus} from '../utils/todo_item_utils'


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
  constructor() {
    super();
    this.state = {
      buttonPressed: false
    }
  }

  fireClick() {
    this.props.fireOnClick(this.props.todo.id);
  }

  getClassName() {
    let className = 'td-issue';
    if (this.props.isDragging) {
      className = 'td-issue td-is-dragging';
    }
    return className;
  }

  startProgress(e) {
    this.setState({buttonPressed: true});
    setTimeout(() => {
      this.props.startProgress({...this.props.todo, ...{status: 'InProgress',toDoStatus: 'ToDo'}})
    }, 1000);
    e.stopPropagation();
  }

  getChangeStatus() {
    // return null;

    if (this.props.todo.status === 'ToDo') {

      return (
        <Tooltip title='Start Progress' position='left'>
          <button
            onClick={this.startProgress.bind(this)}
            className={this.state.buttonPressed ? "td-btn-progress btn-md hvr-ripple-out" : "td-btn-progress btn-md" }
            data-tip="Start Progress"
          >
          </button>
        </Tooltip>

      );
    }
    return null;
  }

  render() {
    const {id, date, label, title, status, priority} = this.props.todo;
    const {connectDragSource, connectDropTarget} = this.props;
    return connectDragSource(connectDropTarget(
      <div className={this.getClassName()} onClick={this.fireClick.bind(this)}>
        <div className="td-issue-content">
          <div className="td-row">
            <span className="td-type" title={priority}>
              {getImgPriority(priority)}
            </span>
            <div className="td-key">
              <span title={id} className="td-key-link">{id}</span>
            </div>
            <div className="td-summary" title={title}>
              <span className="td-inner">{title}</span>
            </div>
            {this.getChangeStatus()}
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
        <div className="td-grabber" style={getColorStatus(status)}></div>
      </div>
    ));
  }
}
export default DragSource(MOVE_TODO_IN_LIST, todoSource, collectSource)(DropTarget(MOVE_TODO_IN_LIST, todoTarget, collectTarget)(TodoItemLong));