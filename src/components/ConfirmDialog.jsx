import { Modal, Button } from "react-bootstrap";

function ConfirmDialog(props) {
  return (
    <Modal size="md" show={true} onHide={props.onCancel(false)}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Are you sure to delete {props.tasksCount} task(s)?</Modal.Title> */}
        <Modal.Title>Are you sure to delete {props.tasksCount} {props.tasksCount >1 ? 'tasks': 'task'}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-evenly">
          <Button variant="danger" onClick={props.onSubmit}>
            Delete
          </Button>
          <Button variant="success" onClick={props.onCancel(false)}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmDialog;