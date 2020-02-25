import { ON_LIST_MOVE, ON_CARD_MOVE, SET_LISTS } from "./types";
import FakeData from "../../fakeData.json";
const fetchLists = async () => {
  try {
    return FakeData.lists;
  } catch (err) {
    return err;
  }
};
const setFetchedLists = lists => {
  return {
    type: SET_LISTS,
    lists,
    volunteers: FakeData.volunteers
  };
};
export const loadLists = () => {
  return async dispatch => {
    const data = await fetchLists();
    dispatch(setFetchedLists(data));
  };
};

export const _onListMove = (index, listTargetId) => {
  return async dispatch => {
    dispatch({
      type: ON_LIST_MOVE,
      index,
      listTargetId
    });
  };
};

export const _onVolunteerMove = (
  volunteerTargetId,
  hoveredVolunteerIndex,
  listId
) => {
  return async dispatch => {
    dispatch({
      type: ON_CARD_MOVE,
      volunteerTargetId,
      hoveredVolunteerIndex,
      listId
    });
  };
};
