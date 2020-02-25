export const toLowerCaseIfAlpha = value => {
  return typeof value === "string" ? value.toLowerCase() : value;
};
export const pancakeSort = (propertyName, ascending) => {
  return (a, b) => {
    if (
      toLowerCaseIfAlpha(a[propertyName]) < toLowerCaseIfAlpha(b[propertyName])
    ) {
      return ascending ? -1 : 0;
    }
    return ascending ? 0 : -1;
  };
};

export const addVolunteersIsToEachList = (lists, volunteers) => {
  const sortedVolunteers = volunteers.sort(pancakeSort("pos", true));
  let sortedLists = lists.sort(pancakeSort("pos", true));
  return sortedLists.map(list => {
    let volunteersId = [];
    sortedVolunteers.forEach(volunteer => {
      if (
        list.name === "NEW" &&
        (!volunteer.listId || volunteer.listId === list._id.toString())
      ) {
        return volunteersId.push(volunteer._id);
      }
      if (volunteer.listId === list._id.toString()) {
        return volunteersId.push(volunteer._id);
      }
    });
    return {
      ...list,
      volunteersId
    };
  });
};

export const cardMove = (state, action) => {
  return state.lists
    .map(list => {
      return {
        ...list,
        volunteersId: list.volunteersId
          ? list.volunteersId.filter(_id => action.volunteerTargetId !== _id)
          : []
      };
    })
    .map(list => {
      return {
        ...list,
        volunteersId:
          action.listId === list._id
            ? [
                ...list.volunteersId.slice(0, action.hoveredVolunteerIndex),
                action.volunteerTargetId,
                ...list.volunteersId.slice(action.hoveredVolunteerIndex)
              ]
            : list.volunteersId
      };
    });
};
