import React, { Component } from "react";
import axios from "axios";

import StudentList from "./StudentList.js";
import SingleStudent from "./SingleStudent.js";
import NewStudentForm from "./NewStudentForm.js";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showStudent: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log("fetching");
    try {
      const { data } = await axios.get("/student");
      this.setState({ students: data });
      console.log("This is the State", this.state);
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student
    });
  }

  handleClick(e) {
    return this.setState({
      showStudent: !this.state.showStudent
    });
  }

  async addStudent(newStudent) {
    try {
      const res = await axios.post("/student", newStudent);
      this.setState(previousState => ({
        students: [...previousState.students, res.data]
      }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    console.log("this is the state in main", this.state);
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {this.state.showStudent ? (
          <NewStudentForm addStudent={this.addStudent} />
        ) : null}
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
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}

//refactor to redux:
//new folder, store, for reducers--declare state, manipulate(thunks)
//import provider from react-redux, wrap everthing
//import store from folder to index.js
