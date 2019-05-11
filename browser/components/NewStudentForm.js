import React, { Component } from "react";

class NewStudentForm extends Component {

  render() {
    return (
      <form>
        <label htmlFor="firstName">
          {" "}
          First Name:
          <input name="firstName" />
        </label>
        <label htmlFor="lastName">
          {" "}
          Last Name:
          <input name="lastName" />
        </label>
        <label htmlFor="email">
          {" "}
          email:
          <input name="email" />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default NewStudentForm;
