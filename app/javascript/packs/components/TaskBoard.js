import React from "react";
import Board from "react-trello";
import { Button } from "react-bootstrap";

import LaneHeader from "./LaneHeader";
import AddPopup from "./AddPopup";

import { fetch } from "../utils/fetch";

export default class TaskBoard extends React.Component {
  state = {
    board: {
      new_task: null,
      in_development: null,
      in_qa: null,
      in_code_review: null,
      ready_for_release: null,
      released: null,
      archived: null
    },
    addPopupShow: false
  };

  stateEvents = {
    in_development: "develop",
    in_qa: "qa",
    in_code_review: "code_review",
    ready_for_release: "ready",
    released: "release",
    archived: "archive"
  };

  componentDidMount() {
    this.loadLines();
  }

  onLaneScroll = (requestedPage, state) => {
    return this.fetchLine(state, requestedPage).then(({ items }) =>
      items.map(task => ({
        ...task,
        label: task.state,
        title: task.name
      }))
    );
  };

  getBoard = () => {
    return {
      lanes: [
        this.generateLane("new_task", "New"),
        this.generateLane("in_development", "In Dev"),
        this.generateLane("in_qa", "In QA"),
        this.generateLane("in_code_review", "In CR"),
        this.generateLane("ready_for_release", "Ready for release"),
        this.generateLane("released", "Released"),
        this.generateLane("archived", "Archived")
      ]
    };
  };

  fetchLine = (state, page = 1) => {
    return fetch(
      "GET",
      window.Routes.api_v1_tasks_path({
        q: { state_eq: state },
        page,
        per_page: 10,
        format: "json"
      })
    ).then(({ data }) => {
      return data;
    });
  };

  loadLines = () => {
    this.loadLine("new_task");
    this.loadLine("in_development");
    this.loadLine("in_qa");
    this.loadLine("in_code_review");
    this.loadLine("ready_for_release");
    this.loadLine("released");
    this.loadLine("archived");
  };

  loadLine = (state, page = 1) => {
    this.fetchLine(state, page).then(data => {
      this.setState(prevState => ({
        ...prevState,
        board: {
          ...prevState.board,
          [state]: data
        }
      }));
    });
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    fetch("PUT", window.Routes.api_v1_task_path(cardId, { format: "json" }), {
      task: { state_event: this.stateEvents[targetLaneId] }
    }).then(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  };

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added) {
      this.loadLine("new_task");
    }
  };

  generateLane(id, title) {
    const { board } = this.state;
    const tasks = board[id];
    return {
      id,
      title,
      total_count: tasks ? tasks.meta.total_count : "None",
      cards: tasks
        ? tasks.items.map(task => ({
            ...task,
            label: task.state,
            title: task.name
          }))
        : []
    };
  }

  render() {
    return (
      <div>
        <h1>Your tasks</h1>
        <Button bsStyle="primary" onClick={this.handleAddShow}>
          Create new task
        </Button>
        <Board
          data={this.getBoard()}
          onLaneScroll={this.onLaneScroll}
          customLaneHeader={<LaneHeader />}
          cardsMeta={this.state}
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
        />
        <AddPopup
          show={this.state.addPopupShow}
          onClose={this.handleAddClose}
        />
      </div>
    );
  }
}
