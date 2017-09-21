import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm} from 'redux-form'


import ToDoForm from './todo-form'
import * as actions from '../actions';

const initialValues = {
  date: '',
  title: '',
  label: '',
  status: 'ToDo',
  priority: 'normal',
  toDoStatus: 'ToDo',
  description: ''
};

class NewToDoForm extends Component {

  onSubmit(values){
    this.props.saveNewToDo({...initialValues,...values},()=>{
      this.props.fetchTodos();
      this.props.showHideModal(false);
    });
    console.log('new values',{...initialValues,...values});
  }
  getDataFormated(){
      return '11/11/2017'
  }
  render() {
    const additionalProps ={
      onSubmit: this.onSubmit.bind(this),
      formClass:'td-new',
      initialValues

    };
    return ToDoForm({...this.props,...additionalProps});
  }
}

NewToDoForm = reduxForm({
  form: 'simple'
})(NewToDoForm);


NewToDoForm = connect(
  null,
  actions
)(NewToDoForm);

export default NewToDoForm