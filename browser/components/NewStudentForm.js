import React, { Component } from "react";
import addStudent from "./Main";

export default class NewStudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      this.props.addStudent(this.state);
      this.setState({
        firstName: "",
        lastName: "",
        email: ""
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Submit New Student</button>
      </form>
    );
  }
}
