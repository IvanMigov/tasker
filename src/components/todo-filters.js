import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const filterButtons = [
  {
    value: 'ToDo',
    label: 'To Do'
  }
  ,  {
    value: 'InProgress',
    label: 'In Progress'
  },
  {
    value: 'Closed',
    label: 'Closed'
  }

];

class ToDoFilters extends Component {
  componentWillMount() {
    this.props.fetchFiltersSet();
  }
  getClassName(filter){
    let className = 'td-btn-filter';
    if(this.props.filters[filter]){
      className = 'td-btn-filter active';
    }
    return className;
  }
  triggerFilter(){
    let newFilter = {};
    const self = this[0],
      item = this[1],
      key = item.value;
    newFilter[key] = !self.props.filters[key];
    self.props.changeFiltersSet({...self.props.filters,...newFilter});
  }
  getFilterItem(item) {
    return (
      <button
        key={item.value}
        type="button"
        className={this.getClassName(item.value)}
        onClick={this.triggerFilter.bind([this,item])}
      >{item.label}</button>
    );
  }
  render() {
    return (
    <div className="td-filters">
      <div className="btn-group">
        <span>Quick Filters:</span>
        {
          filterButtons.map(this.getFilterItem.bind(this))
        }
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { filters: state.filters };
}

export default connect(mapStateToProps, actions)(ToDoFilters);
