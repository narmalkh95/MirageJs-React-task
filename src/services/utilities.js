import {message} from "antd";

export const messageType = {
  success: "success",
  error: "error",
  info: "info",
};

export const showMessage = (type, content, duration = 3) => {
  message[type]({
    content,
    duration: duration,
  });
};
