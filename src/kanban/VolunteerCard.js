import React, { Component } from "react";

class VolunteerCard extends Component {
  state = { draggableVolunteer: false };
  render() {
    const {
      draggable,
      onSetVolunteerTargetOption,
      onVolunteerMove,
      volunteerIndex,
      onVolunteerDragEnd,
      targetVolunteer,
      volunteer,
      listId,
      volunteerTargetId,
      volunteersForAList,
      listName
    } = this.props;
    const { draggableVolunteer } = this.state;
    return (
      <span
        style={
          volunteer && volunteer._id === volunteerTargetId
            ? {
                opacity: 0.5
              }
            : {}
        }
        className={`card-body ${draggable ? "" : "card-spacer"}`}
        id="card"
        draggable={draggableVolunteer && draggable}
        onDragStart={e => {
          onSetVolunteerTargetOption(e, volunteer._id);
        }}
        onDragOver={e => {
          volunteer &&
            volunteer._id !== volunteerTargetId &&
            targetVolunteer === "card" &&
            onVolunteerMove(
              e,
              volunteer && volunteer._id ? volunteer._id : volunteerTargetId,
              volunteerIndex,
              listId,
              volunteersForAList,
              listName
            );
        }}
        onDragEnd={() => {
          onVolunteerDragEnd();
          this.setState({ draggableVolunteer: false });
        }}
      >
        <span
          className="card-destination"
          onMouseDown={() => this.setState({ draggableVolunteer: true })}
        />
        {volunteer && (
          <span className="card-destination-title">
            {volunteer.firstName} {volunteer.lastName}
          </span>
        )}
      </span>
    );
  }
}

export default VolunteerCard;
