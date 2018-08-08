import React from 'react';
import PropTypes from 'prop-types';

export class TextInput extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    required: PropTypes.bool
  }

  handleChange = (e) => {
    let { onChange, label, name } = this.props;
    onChange(name, e.target.value);
  }

  render(){
    let { label, onChange, value, required, type, name } = this.props;
    return (
      <div className="input text form-group">
        <label forhtml={name}>{label}</label>
        <input type={type || 'text'}
          className="form-control"
          name={name}
          onChange={this.handleChange}
          value={value}
          required={required}/>
        {required && <small className="float-right text-danger">required</small>}
      </div>
    );
  }
}

export class TextArea extends TextInput {
  render(){
    let { label, onChange, value, required } = this.props;

    return (
      <div className="input text form-group">
        <label>{label}</label>
        <textarea
          className="form-control"
          onChange={this.handleChange}
          value={value}
          required={required}/>
          {required && <small className="float-right text-danger">required</small>}
      </div>
    );
  }
}

export class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      display_name: PropTypes.string,
      id: PropTypes.string
    }))
  }

  handleChange = (e) => {
    let { onChange, label, name, required } = this.props;
    onChange(name, e.target.value);
  }

  render(){
    let { label, onChange, options, required } = this.props;
    return (
      <div className="input select form-group">
        <label>{label}</label>
        <select onChange={this.handleChange}
          className="form-control"
          required={required} >
          <option value={''}></option>
          {options.map(({ display_name, id }, i)=>(
            <option value={id} key={i}>{display_name}</option>
          ))}
        </select>
        {required && <small className="float-right text-danger">required</small>}
      </div>
    );
  }
}

export class Checkbox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    required: PropTypes.bool
  }

  handleChange = (e) => {
    let { onChange, label, name, value } = this.props;
    onChange(name, e.target.checked);
  }

  render(){
    let { label, onChange, value, required } = this.props;
    return (
      <div className="input checkbox form-check">
        <input type="checkbox"
          className="form-check-input"
          checked={value}
          required={required}
          onChange={this.handleChange}/>
        <label className="form-check-label">{label}</label>
      </div>
    );
  }
}
