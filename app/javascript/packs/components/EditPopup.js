import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { fetch } from "../utils/fetch";

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: "",
      description: "",
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      }
    },
    isLoading: true
  };

  componentDidUpdate(prevProps) {
    const { cardId } = this.props;
    if (cardId != null && cardId !== prevProps.cardId) {
      this.loadCard(cardId);
    }
  }

  loadCard = cardId => {
    this.setState({ isLoading: true });
    fetch(
      "GET",
      window.Routes.api_v1_task_path(cardId, { format: "json" })
    ).then(({ data }) => {
      this.setState({ task: data, isLoading: false });
    });
  };

  handleNameChange = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      task: { ...prevState.task, name: value }
    }));
  };

  handleDescriptionChange = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      task: { ...prevState.task, description: value }
    }));
  };

  handleCardDelete = () => {
    const { task } = this.state;
    const { cardId, onClose } = this.props;
    const { state } = task;
    fetch(
      "DELETE",
      window.Routes.api_v1_task_path(cardId, { format: "json" })
    ).then(response => {
      if (response.statusText === "OK") {
        onClose(state);
      } else {
        alert(`DELETE failed! ${response.status} - ${response.statusText}`);
      }
    });
  };

  handleCardEdit = () => {
    const { task } = this.state;
    const { cardId, onClose } = this.props;
    const { name, description, state, author, assignee } = task;
    fetch("PUT", window.Routes.api_v1_task_path(cardId, { format: "json" }), {
      name,
      description,
      author_id: author.id,
      // assignee_id: assignee.id,
      state
    }).then(response => {
      if (response.statusText === "OK") {
        onClose(state);
      } else {
        alert(`Update failed! ${response.status} - ${response.statusText}`);
      }
    });
  };

  render() {
    const { isLoading, task } = this.state;
    const { show, onClose } = this.props;
    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Task # {task.id} [{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDescriptionChange}
                />
              </FormGroup>
            </form>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            Author: {task.author.first_name} {task.author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
