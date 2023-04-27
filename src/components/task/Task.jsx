import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";
import styles from "./task.module.css";

function Task(props) {
  const task = props.data;

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="mt-2 mb-2">
        <Card.Body>
          <div className={styles.cardHeader}>
            <Form.Check
              className={styles.selectTask}
              onChange={() => props.onTaskSelect(task._id)}
              checked={props.checked}
            />
            <Card.Title className={`${styles.textElipsis} ml-2`}>{task.title}</Card.Title>
          </div>
          <Card.Text className={styles.textElipsis}>
            {task.description}
          </Card.Text>
          <Card.Text>Status: {task.status}</Card.Text>
          <Card.Text>Created At: {formatDate(task.created_at)}</Card.Text>
          <Card.Text>Deadline: {formatDate(task.date)}</Card.Text>
          <div className={styles.actionButtons}>
      {
        task.status === 'active' ?
        <Button 
        title="Mark as done" 
        variant="success" 
        onClick={() => props.onStatusChange({status: 'done', _id: task._id})}>
          <FontAwesomeIcon icon={faCheck} />
        </Button> :
        <Button 
        className={styles.actionButton}
        title="Mark as active" 
        variant="info"
        style={{marginLeft: '5px'}}
        onClick={() => props.onStatusChange({status: 'active', _id: task._id})}>
          <FontAwesomeIcon icon={faHistory} />
        </Button>
      }
            <Button
              title="Edit"
              className={styles.actionButton}
              variant="warning"
              style={{marginLeft: '5px'}}
              onClick={() => props.onTaskEdit(task)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              title="Delete"
              variant="danger"
              className={styles.actionButton}
              style={{marginLeft: '5px'}}
              onClick={() => props.onTaskDelete(task._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskSelect: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(Task);