import React, { Component } from "react";
import Board from "./Board";
import { connect } from "react-redux";
import {
  _onListMove,
  _onVolunteerMove,
  loadLists,
  loadVolunteers
} from "../Redux/Actions";
import { creatNewPos, creatNewVolunteerPos } from "./helpers";
import "./index.css";

let hoveredVolunteerId;
let hoveredListId;
let targetListName;
let targetVolunteersForAList;
class Kanban extends Component {
  state = {
    volunteerTargetId: null,
    targetVolunteer: "",
    listTargetId: null,
    listTarget: "",
    showVolunteerDetail: false,
    volunteer: {}
  };
  componentDidMount() {
    this.props.loadLists();
    this.props.loadVolunteers();
  }
  onSetListTargetOption = (e, listTargetId) => {
    const target = e.target;
    if (target.id === "list") {
      this.setState({
        listTargetId,
        listTarget: target.id
      });
      setTimeout(function() {
        target.style.opacity = "0.3";
      }, 1);
    }
  };
  onListMove = index => {
    const { listTarget, listTargetId } = this.state;
    if (listTarget === "list") {
      this.props._onListMove(index, listTargetId);
    }
  };

  onSetVolunteerTargetOption = (e, volunteerTargetId) => {
    const target = e.target;
    e.dataTransfer.setData("text/plain", volunteerTargetId);
    if (target.id === "card")
      this.setState({
        volunteerTargetId,
        targetVolunteer: target.id
      });
  };

  onVolunteerMove = (
    e,
    hoveredId,
    hoveredVolunteerIndex,
    listId,
    volunteersForAList,
    listName
  ) => {
    e.preventDefault();
    const { targetVolunteer, volunteerTargetId } = this.state;
    if (targetVolunteer === "card") {
      hoveredVolunteerId = hoveredId;
      hoveredListId = listId;
      targetVolunteersForAList = volunteersForAList
        ? volunteersForAList
        : targetVolunteersForAList;
      targetListName = listName;
      this.props._onVolunteerMove(
        volunteerTargetId,
        hoveredVolunteerIndex,
        listId
      );
    }
  };

  onVolunteerDragEnd = () => {
    const { volunteerTargetId } = this.state;
    if (targetVolunteersForAList) {
      console.log(volunteerTargetId);
      //update volunteer
      let pos;
      targetVolunteersForAList.forEach((volunteer, index) => {
        if (volunteer._id === hoveredVolunteerId) {
          pos = creatNewVolunteerPos(
            targetVolunteersForAList,
            index,
            volunteerTargetId
          );
        }
      });
      if (pos) {
        console.log(volunteerTargetId, {
          pos,
          listId: hoveredListId,
          volunteerStatus: targetListName
        });
        // this.props.onReorderVolunteer(volunteerTargetId, {
        //   pos,
        //   listId: hoveredListId,
        //   volunteerStatus: targetListName
        // });
      } else {
        console.log(volunteerTargetId, {
          listId: hoveredListId,
          volunteerStatus: targetListName
        });
        // this.props.onReorderVolunteer(volunteerTargetId, {
        //   listId: hoveredListId,
        //   volunteerStatus: targetListName
        // });
      }
    }
    this.setState({
      volunteerTargetId: null,
      targetVolunteer: "",
      listTargetId: null,
      listTarget: ""
    });
  };

  onListDragEnd = (e, listId, listIndex) => {
    const { listTarget } = this.state;
    if (listTarget === "list") {
      //update lists
      const { lists } = this.props;
      const pos = creatNewPos(lists, listIndex);
      console.log(listId, { pos });
      // this.props.editList(listId, { pos: newPos });
    }
    const target = e.target;
    setTimeout(function() {
      target.style.opacity = "1";
    }, 1);
    this.setState({
      volunteerTargetId: null,
      targetVolunteer: "",
      listTargetId: null,
      listTarget: ""
    });
  };

  render() {
    const { volunteers, lists } = this.props;
    return (
      <div className="kanban-container">
        <div className="kanban-wrapper">
          {lists.length > 0 ? (
            <Board
              {...this.state}
              lists={lists}
              volunteers={volunteers}
              onSetVolunteerTargetOption={this.onSetVolunteerTargetOption}
              onVolunteerDragEnd={this.onVolunteerDragEnd}
              onListDragEnd={this.onListDragEnd}
              onSetListTargetOption={this.onSetListTargetOption}
              onListMove={this.onListMove}
              onVolunteerMove={this.onVolunteerMove}
            />
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              Loading...
            </div>
          )}
        </div>
      </div>
    );
  }
}
export function mapStateToProps(store) {
  const { lists, volunteers } = store;
  return {
    lists: lists.lists,
    volunteers: volunteers.volunteers
  };
}
export default connect(mapStateToProps, {
  _onListMove,
  _onVolunteerMove,
  loadLists,
  loadVolunteers
})(Kanban);
