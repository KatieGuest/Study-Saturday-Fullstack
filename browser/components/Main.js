import React, { Component } from "react";
import axios from "axios";

import StudentList from "./StudentList.js";
import SingleStudent from "./SingleStudent.js";
import NewStudentForm from "./NewStudentForm";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showAddNewStudent: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log("fetching");
    try {
      const { data } = await axios.get("/student");
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student
    });
  }

  toggle(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showAddNewStudent: !prevState.showAddNewStudent
    }));
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <button type="submit" onClick={this.toggle}>
          Add New Student
        </button>
        {this.state.showAddNewStudent ? <NewStudentForm /> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        <button hidden="true">Add New Student</button>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
