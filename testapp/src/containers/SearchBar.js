import React, { Component } from 'react';

class SearchBar extends Component {
  onInput = e => {
    this.props.inputHandler(e.target.value);
  };

  render() {
    console.log(this.props.fn);
    return <input className="input" type="text" onChange={this.onInput} />;
  }
}

export default SearchBar;
