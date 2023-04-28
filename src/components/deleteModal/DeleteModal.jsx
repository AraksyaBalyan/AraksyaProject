import { useState, memo } from "react";
import { Button } from "react-bootstrap";
import ConfirmDialog from "../ConfirmDialog";

function DeleteSelected(props) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen(!isConfirmDialogOpen);
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={toggleConfirmDialog}
        disabled={props.disabled}
      >
        Delete selected
      </Button>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          tasksCount={props.tasksCount}
          onCancel={toggleConfirmDialog}
          onSubmit={()=>{
            props.onSubmit();
            toggleConfirmDialog();
          }}
        />
      )}
    </>
  );
}

export default memo(DeleteSelected);