import { FETCH_HIGHLIGHT_EVENT } from "../TYPES";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_HIGHLIGHT_EVENT: {
      return { highlight: action.payload } || [];
    }
    default: {
      return state;
    }
  }
}