import {Modal, Button} from "react-bootstrap";

function ConfirmDialog(){
    return(
        <Modal
        size="sm"
        show={false}
        onHide={() => {}}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure to delete the selected tasks?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div className="d-flex justify-content-evenly">
        <Button variant='danger'>Delete</Button>
        <Button variant='success'>Cancel</Button>
        </div>
        </Modal.Body>
      </Modal>
    );
}

export default ConfirmDialog;