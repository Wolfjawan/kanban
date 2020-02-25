import { SET_LISTS, ON_LIST_MOVE, ON_CARD_MOVE } from "../Actions/types";
import { addVolunteersIsToEachList, cardMove } from "./helpers";
const INITIAL_STATE = {
  lists: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LISTS:
      const { volunteers, lists } = action;
      if (lists && lists.length > 0 && volunteers && volunteers.length > 0) {
        const listsWithVolunteersId = addVolunteersIsToEachList(
          lists,
          volunteers
        );
        return {
          ...state,
          lists: listsWithVolunteersId
        };
      }
      return {
        ...state
      };
    case ON_LIST_MOVE:
      if (action.listTargetId) {
        const targetList = state.lists.find(
          list => list._id === action.listTargetId
        );
        const newLists = state.lists.filter(
          list => list._id !== action.listTargetId
        );
        newLists.splice(action.index, 0, targetList);
        return {
          ...state,
          lists: newLists
        };
      }
      return {
        ...state
      };
    case ON_CARD_MOVE:
      if (action.volunteerTargetId) {
        const lists = cardMove(state, action);
        return {
          ...state,
          lists
        };
      }
      return {
        ...state
      };
    default:
      return state;
  }
};
