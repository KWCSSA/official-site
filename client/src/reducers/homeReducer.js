import { FETCH_HOME } from "../TYPES";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_HOME: {
      return action.payload || [];
    }
    default: {
      return state;
    }
  }
}