import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { fetch } from "../utils/fetch";

export default class AddPopup extends React.Component {
  state = {
    name: "",
    description: "",
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null
    }
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleCardAdd = () => {
    const { name, description, assignee } = this.state;
    const { onClose } = this.props;
    fetch("POST", window.Routes.api_v1_tasks_path(), {
      task: {
        name,
        description,
        assignee_id: assignee.id
      }
    }).then(response => {
      if (response.statusText === "Created") {
        onClose(true);
      } else {
        alert(`${response.status} - ${response.statusText}`);
      }
    });
  };

  render() {
    const { name, description } = this.state;
    const { show, onClose } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formTaskDescription">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDescriptionChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
