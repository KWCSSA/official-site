import { SEND_MESSAGE } from "../TYPES";

export default function(state = null, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      if (action.payload.success) {
        return { msgResponse: { success: true, errorMsg: '' }};
      } else {
        return { msgResponse: { success: false, errorMsg: action.payload.error }};
      }
    }
    default: {
      return state;
    }
  }
}