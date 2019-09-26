import { USER_LOGIN } from '../TYPES';

export default function (state = { auth: false }, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        auth: action.payload
      }
    }
    default: {
      return state;
    }
  }
}