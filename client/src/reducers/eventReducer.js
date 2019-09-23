import { FETCH_EVENT } from "../TYPES";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_EVENT: {
      const highlight = action.payload.filter(event => event.highlight);
      return { highlight, events: action.payload } || [];
    }
    default: {
      return state;
    }
  }
}