import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm} from 'redux-form'
import ToDoForm from './todo-form'
import * as actions from '../actions';

class EditToDoForm extends Component {
  componentDidMount() {
    this.props.GetToDo(this.props.match.params.ToDoId);
  }

  onSubmit(values){
    this.props.saveToDo(values,()=>{
      this.props.fetchTodos()
    });
    this.props.setToDo(null);
  }

  render() {
    return ToDoForm({...this.props,onSubmit: this.onSubmit.bind(this)});
  }
}
const mapStateToProps = (state) => ({
  initialValues: state.todo,
  todo: state.todo
});

EditToDoForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize: true
})(EditToDoForm);

EditToDoForm = connect(
  mapStateToProps,
  actions
)(EditToDoForm);

export default EditToDoForm