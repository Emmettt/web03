import React, { Component } from 'react';

class ContactTab extends Component {
  render() {
    console.log('ContactTab, this.props.items :', this.props.items);
    let contact = this.props.items.find(
      el => el.contact.email === this.props.contact
    );
    console.log(contact);
    if (!contact) return <div />;
    const { firstName, lastName, avatar } = contact.general;
    const { title, company } = contact.job;
    const { street, city, zipCode, country } = contact.address;
    const { email, phone } = contact.contact;

    return (
      <section className="sectionInfo">
        <img
          className="avatarFullSize"
          src={avatar}
          alt={firstName}
          width="32px"
        />
        <div class="infoWrapper">
          <p className="firstName">{firstName}</p>
          <p className="lastName">{lastName}</p>
          <p className="job">{title}</p>
          <p className="job">{company}</p>
        </div>
        <p className="adress">{street}</p>
        <p className="adress">{city}</p>
        <p className="adress">{zipCode}</p>
        <p className="adress">{country}</p>
        <p className="contacts">e-mail: {email}</p>
        <p className="contacts">phone: {phone}</p>
      </section>
    );
  }
}

export default ContactTab;
