import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired
  }

  render(){
    let { title, children, onSubmit, submitText } = this.props;
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="form__heading">
          <h2>{title}</h2>
          <hr />
        </div>
        <div className="form__inputs">
          {children}
        </div>
        <button className="form__button btn btn-primary mt-4 float-right"
          type="submit">{submitText}</button>
      </form>
    );
  }
}
