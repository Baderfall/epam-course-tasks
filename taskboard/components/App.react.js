import React from 'react';
import { Col } from 'react-bootstrap';
import List from './List.react';


const toDoList = ['toDo1', 'alo2', 'alo3'];
const inProgressList = [];
const testingList = [];
const doneList = [];

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Taskboard</h1>
        <Col bsStyle="warning" md={3}>
            <h3>To Do</h3>
            <List items={toDoList}/>
        </Col>
        <Col md={3}>
            <h3>In progress</h3>
            <List items={inProgressList}/>
        </Col>
        <Col md={3}>
            <h3>In testing</h3>
            <List items={testingList}/>
        </Col>
        <Col md={3}>
            <h3>Done!</h3>
            <List items={doneList}/>
        </Col>
    </div>
    )
  }
}
