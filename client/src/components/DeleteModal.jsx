import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal({ type, show, setShow, handleDelete }) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to continue deleting this {type}?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>

        <Button variant="primary" onClick={() => setShow(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
