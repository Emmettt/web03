import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  render() {
    let matched = this.props.items.filter(el1 =>
      Object.getOwnPropertyNames(el1).find(el2 =>
        Object.getOwnPropertyNames(el1[el2]).find(el3 => {
          return (
            el1[el2][el3]
              .toLowerCase()
              .indexOf(this.props.query.toLowerCase()) !== -1
          );
        })
      )
    );

    return (
      <ul>
        {matched.map(el => {
          return (
            <Contact
              key={el.contact.email}
              contact={el}
              contactClickHandler={this.props.contactClickHandler}
            />
          );
        })}
      </ul>
    );
  }
}

export default ContactList;
