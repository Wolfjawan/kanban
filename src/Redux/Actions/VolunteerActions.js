import { LOAD_VOLUNTEERS } from "./types";
import FakeData from "../../fakeData.json";

export const getVolunteers = async () => {
  try {
    return FakeData.volunteers
  } catch (err) {
    return err;
  }
};
export const setVolunteers = volunteers => {
  return {
    type: LOAD_VOLUNTEERS,
    volunteers
  };
};
export const loadVolunteers = () => {
  return async dispatch => {
    const data = await getVolunteers();
    dispatch(setVolunteers(data));
  };
};
