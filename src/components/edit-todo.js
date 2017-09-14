import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Loader from './loader'
import * as actions from '../actions';

class EditToDoForm extends Component {
  componentDidMount() {
    this.props.GetToDo(this.props.match.params.ToDoId);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.ToDoId !== this.props.match.params.ToDoId){
      this.props.GetToDo(nextProps.match.params.ToDoId );
    }

  }
  render() {
    const { handleSubmit, pristine, reset, submitting, initialValues } = this.props;
    if(!initialValues){
      return (
        <div className="td-edit">
          <Loader/>
        </div>
      )
    }
    return (
    <div className="td-edit">
      <form onSubmit={handleSubmit}>
        <span>{initialValues.id}</span>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="title"
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>
      </form>
    </div>
    )

  }
}


EditToDoForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize: true
})(EditToDoForm);

EditToDoForm = connect(
  state => ({
    initialValues: state.todo // pull initial values from account reducer
  }),
  actions

)(EditToDoForm);

export default EditToDoForm