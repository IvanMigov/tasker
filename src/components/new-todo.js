import {Component} from 'react';
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
    values = {...values, date: this.getDataFormated()};
    this.props.saveNewToDo({...initialValues,...values},()=>{
      this.props.fetchTodos();
      this.props.showHideModal(false);
    });
    console.log('new values',{...initialValues,...values});
  }
  onClose() {
    this.props.showHideModal(false);
  }
  getDataFormated(){
    const thisDate = new Date();
      return `${(thisDate.getMonth() + 1)}/${thisDate.getDate()}/${thisDate.getFullYear()}`
  }
  render() {
    const additionalProps ={
      onSubmit: this.onSubmit.bind(this),
      onClose: this.onClose.bind(this),
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