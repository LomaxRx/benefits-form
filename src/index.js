import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { TextInput, Checkbox, TextArea, Select } from './components/inputs';
import Form from './components/form';
import { getServiceTypes, postAssistanceRequest } from './lib/actions';
import Status from './components/status'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      form: {
        contact: {
          first_name: '',
          last_name: '',
          email: '',
        },
        service_type: '',
        description: ''
      },
      acceptTerms: false,
      serviceTypes: [],
      isLoading: true,
      statusCode: null,
      statusText: null,
      statusMessage: null
    }
  }

  componentDidMount(){
    getServiceTypes(this.receiveServiceTypes)
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setLoading(true);
    postAssistanceRequest({ assistance_request: this.state.form }, this.receivePostResponse);
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  receiveServiceTypes = (err, response) => {
    this.setState({
      isLoading: false,
      serviceTypes: response.data.data
    });
  }

  receivePostResponse = ({ status, data, statusText }) => {
    this.setState({
      isLoading: false,
      statusCode: status,
      statusText,
      statusMessage: data.message
    });
  }

  changeForm = (field, val) => {
    this.setState({
      form: { ...this.state.form, [field]: val }
    });
  }

  changeFormContact = (field, val) => {
    this.setState({
      form: {
        ...this.state.form,
        contact: { ...this.state.form.contact, [field]: val }
      }
    });
  }

  changeState = (field, val) => {
    this.setState({ [field]: val });
  }

  dismissStatus = () => {
    this.setState({
      statusCode: null,
      statusMessage: null,
      statusText: null
    })
  }

  resetState = () => {
    this.setState({
      form: {
        contact: {
          first_name: '',
          last_name: '',
          email: '',
        },
        service_type: '',
        description: ''
      },
      acceptTerms: false,
      isLoading: false,
      statusCode: null,
      statusText: null,
      statusMessage: null
    });
  }

  render(){
    let { form, serviceTypes, acceptTerms, statusCode, statusText, statusMessage, isLoading } = this.state;
    let valid = statusCode === null || statusCode === 201;

    return(
      <div className="container">
        <Status code={statusCode}
          message={statusMessage}
          statusText={statusText}
          dismiss={this.dismissStatus}
          nextStep={this.resetState}/>
        <div className={`form-wrapper clearfix ${statusCode !== null ? 'blur' : ''}`}>
          <Form onSubmit={this.onSubmit}
            title='New Assistance Request'
            submitText='Get Assistance'>
            <fieldset disabled={isLoading}>
              <TextInput onChange={this.changeFormContact}
                name='first_name'
                value={form.contact.first_name}
                label='First Name'
                required={true} />
              <TextInput onChange={this.changeFormContact}
                name='last_name'
                value={form.contact.last_name}
                label='Last Name'
                required={true}/>
              <TextInput onChange={this.changeFormContact}
                type='email'
                name='email'
                value={form.contact.email}
                label='Email'
                required={true}/>
              <Select onChange={this.changeForm}
                name='service_type'
                value={form.service_type}
                label='Service Type'
                required={true}
                options={serviceTypes} />
              <TextArea onChange={this.changeForm}
                name='description'
                required={true}
                value={form.description}
                label='Description' />
              <Checkbox onChange={this.changeState}
                name='acceptTerms'
                required={true}
                value={this.state.acceptTerms}
                label='I hereby accept the terms of service for THE NETWORK and the Privacy Policy' />
            </fieldset>
          </Form>
        </div>
      </div>
    )
  }
}

const el = document.getElementById('app');
ReactDOM.render(<App />, el);
