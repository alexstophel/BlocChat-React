import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAddRoom(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <section>
        <h1>Add New Room</h1>
        <form onSubmit={this.handleSubmit}>
          Enter name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange} />
        </form>
      </section>
    );
  }
}
