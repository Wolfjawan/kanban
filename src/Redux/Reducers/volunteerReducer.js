import { LOAD_VOLUNTEERS } from "../Actions/types";
export const INITIAL_STATE = {
  volunteers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_VOLUNTEERS:
      return {
        ...state,
        volunteers: action.volunteers
      };
    default:
      return state;
  }
};
