import { SEND_MESSAGE, CLEAR_MESSAGE, SEND_MESSAGE_LOADING } from "../TYPES";

export default function(state = null, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      if (action.payload.success) {
        return { success: true, message_ch: '发送成功，我们会尽快与您取得联系！', message_en: 'Success, we will get back to you asap!', sending: false };
      } else {
        return { success: false, message_ch: '发送失败，请稍后重试！', message_en: 'Error, please try again later!', sending: false };
      }
    }
    case SEND_MESSAGE_LOADING: {
      return { success: true, message_ch: '发送中...', message_en: 'Sending...', sending: true };
    }
    case CLEAR_MESSAGE: {
      return null;
    }
    default: {
      return state;
    }
  }
}