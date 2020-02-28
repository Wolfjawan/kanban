import React, { Component, Fragment } from "react";
import VolunteerCard from "./VolunteerCard";
const findVolunteers = (list, volunteers) => {
  const newVolunteers =
    list.volunteersId &&
    list.volunteersId.length > 0 &&
    list.volunteersId.map(volunteerId =>
      volunteers.find(volunteer => volunteer._id === volunteerId)
    );
  return newVolunteers ? newVolunteers : [];
};
class VolunteersForEachList extends Component {
  render() {
    const {
      list,
      onSetVolunteerTargetOption,
      targetVolunteer,
      volunteerTargetId,
      volunteers,
      onVolunteerMove,
      onVolunteerDragEnd
    } = this.props;
    const volunteersForAList = findVolunteers(list, volunteers);
    const fakeV = {
      _id: null
    };
    return (
      <Fragment>
        {volunteersForAList.length > 0 ? (
          volunteersForAList.map((volunteer, volunteerIndex) => {
            if (volunteer) {
              return (
                <VolunteerCard
                  key={`${list._id}_${volunteerIndex}`}
                  volunteersForAList={volunteersForAList}
                  volunteer={volunteer}
                  listId={list._id}
                  listName={list.name}
                  volunteerIndex={volunteerIndex}
                  draggable={true}
                  onVolunteerMove={onVolunteerMove}
                  onSetVolunteerTargetOption={onSetVolunteerTargetOption}
                  targetVolunteer={targetVolunteer}
                  volunteerTargetId={volunteerTargetId}
                  onVolunteerDragEnd={onVolunteerDragEnd}
                />
              );
            } else return null;
          })
        ) : (
          <VolunteerCard
            key={`${list._id}_0`}
            volunteerIndex={0}
            listId={list._id}
            listName={list.name}
            volunteersForAList={volunteersForAList}
            volunteer={fakeV}
            draggable={false}
            onVolunteerMove={onVolunteerMove}
            onSetVolunteerTargetOption={onSetVolunteerTargetOption}
            targetVolunteer={targetVolunteer}
            volunteerTargetId={volunteerTargetId}
            onVolunteerDragEnd={onVolunteerDragEnd}
          />
        )}
      </Fragment>
    );
  }
}

export default VolunteersForEachList;
