import React from "react";

import "./Message.scss";

export const Message = ({ message, onClose }) => (
  <div className="error-message">
    <span data-testid="mainMessage">{message}</span>
    <button className="error-message__close" onClick={onClose}>
      X
    </button>
  </div>
);

export default Message;
