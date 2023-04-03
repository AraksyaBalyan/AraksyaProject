import { Component, memo } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./todo.module.css";

function idGenerator(){
  return Math.random().toString(32)+Math.random().toString(32);
} 

class Todo extends Component {
  constructor(props) {
    super(props);
    console.log("Todo constructor");
  }

  state = {
    tasks: [],
    newTaskTitle: "",
    selectedTasks: new Set(),
    tasksToDelete: new Set(),
    isConfirmDialogOpen: false,
  };

  handleInputChange = (event) => {
    event.preventDefault();
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
    console.log(event.target.value);
  };

  handleInputKeyDown = (event) => {
    if (event.code === "Enter") {
      this.addNewTask();
    }
  };

  addNewTask = () => {
    const trimmedTitle = this.state.newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: idGenerator(),
      title: trimmedTitle,
    };
    const tasks = [...this.state.tasks];
    tasks.push(newTask);
    this.setState({
      tasks,
      newTaskTitle: "",
    });
  };

  onTaskDelete = (taskId) => {
    const { tasksToDelete } = this.state;
    this.setState({
      tasksToDelete: tasksToDelete.add(taskId)
    });
    this.setConfirmDialogOpenState(true)();
  };

  onTaskSelect = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    const { tasksToDelete } = this.state;
    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId);
      tasksToDelete.delete(taskId);
    } else {
      selectedTasks.add(taskId);
      tasksToDelete.add(taskId);
    }
    this.setState({ selectedTasks, tasksToDelete });
  };

  deleteTasks = () => {
    const newTasks = [];
    let updatedSelectedTasks = [];
    const { tasks,tasksToDelete, selectedTasks } = this.state;
    tasks.forEach((task) => {
      if (!tasksToDelete.has(task.id)) {
        newTasks.push(task);
      }
      if (selectedTasks.has(task.id)) {
        updatedSelectedTasks = Array.from(selectedTasks).filter(t => task.id === t.id)
      }
    });
    this.setState({
      tasks: newTasks,
      tasksToDelete: new Set(),
      selectedTasks: new Set(updatedSelectedTasks),
      isConfirmDialogOpen: false
    });
  }

  setConfirmDialogOpenState = (isDialogOpen)=> () => {
    this.setState({
      isConfirmDialogOpen: isDialogOpen
    });
  };

  render() {
    console.log("Todo render");
    const isAddNewTaskButtonDisabled = !this.state.newTaskTitle.trim();

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="8" md="6">
            <InputGroup className="mb-3 mt-4">
              <Form.Control
                placeholder="Task title"
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                value={this.state.newTaskTitle}
              />
              <Button
                variant="success"
                onClick={this.addNewTask}
                disabled={isAddNewTaskButtonDisabled}
              >
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {this.state.tasks.map((task) => {
            return (
              <Task
                data={task}
                key={task.id}
                onTaskDelete={this.onTaskDelete}
                onTaskSelect={this.onTaskSelect}
              />
            );
          })}
        </Row>
        <Button
          className={styles.deletSelected}
          variant="danger"
          onClick={this.setConfirmDialogOpenState(true)}
          disabled={!this.state.selectedTasks.size}
        >
          Delete selected
        </Button>
        {this.state.isConfirmDialogOpen && 
          <ConfirmDialog 
          tasksCount={this.state.selectedTasks.size}
          onCancel={this.setConfirmDialogOpenState}
          onSubmit={this.deleteTasks}
          />}
      </Container>
    );
  }
}

export default memo(Todo);