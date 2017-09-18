import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'

import Loader from './loader'
import * as actions from '../actions';
const statusList = ['ToDo', 'InProgress', 'Closed'];
const priorityList = ['low', 'normal', 'high'];

class EditToDoForm extends Component {
  componentDidMount() {
    this.props.GetToDo(this.props.match.params.ToDoId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ToDoId !== this.props.match.params.ToDoId) {
      this.props.GetToDo(nextProps.match.params.ToDoId);
    }

  }

  render() {
    const {handleSubmit, pristine, reset, submitting, initialValues} = this.props;
    if (!initialValues) {
      return (
        <div className="td-edit">
          <Loader/>
        </div>
      )
    }
    return (
      <div className="td-edit">
        <form onSubmit={handleSubmit}>
          <div className="td-row-id">
            <span className="td-data-id">{initialValues.id}</span>
            <span className="td-data-date">{initialValues.date}</span>
            <Link to={{pathname: `/todos`}}>
              <span className="td-detail-close-icon"></span>
            </Link>

          </div>
          <div className="td-data-title">
            <div>
              <Field
                className="form-control"
                name="title"
                component="input"
                type="text"
                placeholder="brief description"
              />
            </div>
          </div>
          <div className="td-data-row">
            <label className="">Status</label>
            <div>
              <Field name="status" component="select" className="form-control">
                {statusList.map(statusOption =>
                  <option value={statusOption} key={statusOption}>
                    {statusOption}
                  </option>
                )}
              </Field>
            </div>
          </div>

          <div className="td-data-row">
            <label>Priority</label>
            <div>
              <Field name="priority" component="select" className="form-control">
                {priorityList.map(priorityOption =>
                  <option value={priorityOption} key={priorityOption}>
                    {priorityOption}
                  </option>
                )}
              </Field>
            </div>
          </div>
          <div className="td-data-row">
            <label>Label</label>
            <div>
              <Field
                className="form-control"
                name="label"
                component="input"
                type="text"
                placeholder="label"
              />
            </div>
          </div>
          <div className="td-data-description">
            <label>Description</label>
            <div>
              <Field name="description" component="textarea" className="form-control" />
            </div>
          </div>


          <div>
            <button className="btn btn-success" type="submit" >
              Save
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