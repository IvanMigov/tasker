import React from 'react';
import {Field} from 'redux-form'

import Loader from './loader'
const statusList = ['ToDo', 'InProgress', 'Closed'];
const priorityList = ['low', 'normal', 'high'];

let ToDoForm = props => {
  const {handleSubmit, pristine, submitting, initialValues,onSubmit,onClose,formClass} = props;
  if (!initialValues) {
    return (
      <div className={formClass}>
        <Loader/>
      </div>
    )
  }
  return (
    <div className={formClass}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="td-row-id">
          <span className="td-data-id">{initialValues.id}</span>
          <span className="td-data-date">{initialValues.date}</span>
          <span className="td-detail-close-icon" onClick={onClose}> </span>

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
          <button className="btn btn-success" type="submit" disabled={pristine || submitting}>
            Save
          </button>
        </div>
      </form>
    </div>
  )

};


export default ToDoForm