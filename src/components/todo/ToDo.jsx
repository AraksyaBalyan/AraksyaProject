import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../task/Task";
import NavBar from "../navBar/NavBar";
import ConfirmDialog from "../ConfirmDialog";
import DeleteModal from "../deleteModal/DeleteModal";
import TaskModal from "../taskModal/TaskModal";
import Filter from "../filter/Filter";
import TaskApi from "../../api/taskApi";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

const getTasks = (filters)=>{
  taskApi.getAll(filters)
  .then((tasks) => {
    setTasks(tasks);
  })
  .catch((err) => {
    toast.error(err.message);
  });
};

  useEffect(() => {
    getTasks();
  }, []);

  const onAddNewTask = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onTaskDelete = (taskId) => {
    taskApi
      .delete(taskId)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(newTasks);

        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks);
        }

        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(taskId)) {
      selectedTasksCopy.delete(taskId);
    } else {
      selectedTasksCopy.add(taskId);
    }
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = () => {
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(
          `${deletedTasksCount} tasks have been deleted successfully!`
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    taskApi
      .update(editedTask)
      .then((task) => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((t)=>t._id === task._id);
        newTasks[foundIndex] = task;
        toast.success(`Tasks havs been updated successfully!`);
        setTasks(newTasks);
        setEditableTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFilter = (filters)=>{
    getTasks(filters);
  };

  return (
    <Container>
    <Row>
      <NavBar />
    </Row>
      <Row className="justify-content-center m-3">
        <Col xs="6" sm="4" md="3">
          <Button variant="success" onClick={() => setIsAddTaskModalOpen(true)} style={{width: "100%"}}>
            Add new task
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3">
          <Button variant="warning" onClick={selectAllTasks} style={{width: "100%"}}>
            Select all
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3" className="mt-3 mt-md-0">
          <Button variant="secondary" onClick={resetSelectedTasks} style={{width: "100%"}}>
            Reset selected
          </Button>
        </Col>
      </Row>
      <Row>
      <Filter onFilter={onFilter}/>
      </Row>
      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
              checked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              onStatusChange={onEditTask}
            />
          );
        })}
      </Row>
      <DeleteModal
        disabled={!selectedTasks.size}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />
      {taskToDelete && (
        <ConfirmDialog
          tasksCount={1}
          onCancel={() => setTaskToDelete(null)}
          onSubmit={() => {
            onTaskDelete(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => setIsAddTaskModalOpen(false)}
          onSave={onAddNewTask}
        />
      )}
      {editableTask && (
        <TaskModal
          onCancel={() => setEditableTask(null)}
          onSave={onEditTask}
          data={editableTask}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export default Todo;