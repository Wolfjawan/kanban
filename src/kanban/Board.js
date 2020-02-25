import React, { Component } from "react";
import List from "./List";
import VolunteersForEachList from "./VolunteersForEachList";

export default class Board extends Component {
  render() {
    const {
      volunteers,
      lists,
      onSetListTargetOption,
      onListDragEnd,
      onListMove,
      listTarget,
      onVolunteerDragEnd,
      onSetVolunteerTargetOption,
      targetVolunteer,
      onVolunteerMove,
      volunteerTargetId
    } = this.props;
    return (
      <div className="board-body">
        {lists.map((list, listIndex) => {
          if (list) {
            return (
              <List
                volunteersLength={list.volunteersId && list.volunteersId.length}
                key={list._id}
                listIndex={listIndex}
                {...list}
                draggable={true}
                onSetListTargetOption={onSetListTargetOption}
                onListMove={onListMove}
                listTarget={listTarget}
                onListDragEnd={onListDragEnd}
                targetVolunteer={targetVolunteer}
              >
                {volunteers.length > 0 ? (
                  <VolunteersForEachList
                    list={list}
                    volunteers={volunteers}
                    onSetVolunteerTargetOption={onSetVolunteerTargetOption}
                    onVolunteerDragEnd={onVolunteerDragEnd}
                    onVolunteerMove={onVolunteerMove}
                    targetVolunteer={targetVolunteer}
                    volunteerTargetId={volunteerTargetId}
                  />
                ) : (
                  "loading..."
                )}
              </List>
            );
          }
          return "";
        })}
      </div>
    );
  }
}
