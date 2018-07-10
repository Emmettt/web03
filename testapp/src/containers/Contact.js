import React, { Component } from 'react';

class Contact extends Component {
  onclick = id => {
    this.props.contactClickHandler(id);
  };

  render() {
    const { firstName, lastName, avatar } = this.props.contact.general;
    const { title } = this.props.contact.job;
    const { email } = this.props.contact.contact;

    return (
      <li
        onClick={() => {
          this.onclick(email);
        }}
      >
        <img className="avatar32" src={avatar} alt={firstName} width="32px" />
        <div className="contactText">
          {' '}
          <p className="name">
            {firstName} {lastName}
          </p>
          <p className="jobtitle">{title}</p>
        </div>
      </li>
    );
  }
}

export default Contact;
