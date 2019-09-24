import React from 'react';
import { reduxForm, Field } from 'redux-form';

import '../../css/contact/contactForm.css';

const ContactFormInput = ({ type, input, meta, placeholder, required }) => {
  return (
    <React.Fragment>
      <div className='input-group mb-2'>
        <input {...input} type={type} className='form-control' placeholder={placeholder} aria-label={placeholder} required={required} />
      </div>
    </React.Fragment>
  );
};

const ContactFormTextArea = ({ type, input, meta, placeholder, required }) => {
  return (
    <React.Fragment>
      <div className='input-group mb-2'>
        <textarea {...input} type={type} className='msg-content form-control' placeholder={placeholder} aria-label={placeholder} required={required} />
      </div>
    </React.Fragment>
  );
};

class ContactForm extends React.Component {
  sendEmail() {
    window.location = 'mailto:info@kwcssa.com'
  }

  render() {
    return (
      <React.Fragment>
        <form className='w-100' onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div className="mb-3 d-flex align-items-center send-email" onClick={this.sendEmail} style={{fontSize: '22px'}}><i className="material-icons" style={{fontSize: '30px'}}>email</i>&nbsp;&nbsp;info@kwcssa.com</div>
          <Field
            type='text'
            name='name'
            component={ContactFormInput}
            placeholder='姓名 (Name) *'
            required={true}
          />
          <Field
            type='email'
            name='email'
            component={ContactFormInput}
            placeholder='邮箱 (Email) *'
            required={true}
          />
          <Field
            type='tel'
            name='phone'
            component={ContactFormInput}
            placeholder='联系电话 (Phone Number)'
            required={false}
          />
          <Field
            type='text'
            name='subject'
            component={ContactFormInput}
            placeholder='主题 (Subject) *'
            required={true}
          />
          <Field
            type='text'
            name='message'
            component={ContactFormTextArea}
            placeholder='详细内容 (Message) *'
            required={true}
          />
          <div className="row">
            <div className="col-8">
              <div className={this.props.msgResponse && this.props.msgResponse.success ? 'text-success small' : 'text-danger small'}>
                {this.props.msgResponse ? this.props.msgResponse.message_ch : ''} <br />
                {this.props.msgResponse ? this.props.msgResponse.message_en : ''}
              </div>
            </div>
            <div className="col-4">
              <button type='submit' className='btn btn-dark'>Send</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: 'contactForm'
})(ContactForm);